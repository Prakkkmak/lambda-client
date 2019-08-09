import * as alt from 'alt';

var loaded_cefs = [];
var cursor = false;
var controls = true;
var altConsole = false;

export const eCefFlags = {
    FREEZE_PLAYER: 'freeze',
    SHOW_CURSOR: 'cursor'
}

export function createView(id, path, events, flags)
{
    let found = false;
    loaded_cefs.forEach((cef) => {
        if(cef.id === id)    
        {
            found = true;
        }
    });

    if(!found)
    {
        loaded_cefs.push(new CEF(id, path, events, flags));
    } else {
        alt.log('CEF id already taken');
    }
}
export function isOpened(id)
{
    for(let i=0;i<loaded_cefs.length;i++)
    {
        if(loaded_cefs[i].id === id)    
        {
            if(loaded_cefs[i].view != null) return true;
        }
    }
    return false;
}
export function getView(id)
{
    for(let i=0;i<loaded_cefs.length;i++)
    {
        if(loaded_cefs[i].id === id)
        {
            return loaded_cefs[i];
        }
    }

    return undefined;
}
export function showCursor()
{
    if(!cursor) {
        
        alt.showCursor(true);
        cursor = true;
    }
    
}
export function hideCursor()
{
    if(cursor)
    {
        for(let i=0;i<loaded_cefs.length;i++)
        {
            if(loaded_cefs[i].isOpened()  && loaded_cefs[i].view.isVisible && loaded_cefs[i].hasFlag(eCefFlags.SHOW_CURSOR))
            {
                return;
            }
        }
        alt.showCursor(false);
        cursor = false;
    }
}
export function disableControls()
{
    if(controls)
    {
        alt.log('disable controls');
        //alt.toggleGameControls(false);
        controls = false;
    }
}
export function enableControls()
{
    if(!controls)
    {
        for(let i=0;i<loaded_cefs.length;i++)
        {
            if(loaded_cefs[i].isOpened() && loaded_cefs[i].view.isVisible && loaded_cefs[i].hasFlag(eCefFlags.FREEZE_PLAYER))
            {
                alt.setTimeout(() => {
                    alt.toggleGameControls(false);
                }, 100);
                return;
            }
        }

        alt.toggleGameControls(true);
        controls = true;
    }
}
export function openConsole()
{
    disableControls();
    alt.log('Open Console');
    altConsole = true;
}
export function closeConsole()
{
    enableControls();
    alt.log('Close Console');
    altConsole = false;
}
export function toggleConsole()
{
    if(altConsole)
    {
        closeConsole();
    } else 
    {
        openConsole();
    }
}

export class CEF
{
    constructor(id, path, events, flags, preLoad = false)
    {
        this.id = id;
        this.path = 'http://resources/lambda-client/modules/'+path;
        this.view = null;
        this.events = events;
        this.flags = flags; 
    }

    isOpened()
    {
        return this.view !== null;
    }

    open(callback = function() {})
    {
        if(!this.isOpened())
        {
            this.view = new alt.WebView(this.path);
        
            Object.keys(this.events).forEach((key) => {
                this.view.on(key, this.events[key]);
            });
                
            this.view.on('onLoad', () => {
                this.show();
                callback();
            });
            
        } else {
            this.show();

            callback();
        }
    }
    show()
    {
        alt.log(this.id + ': Show called')
        this.view.isVisible = true;
        this.view.focus();
        if(this.hasFlag(eCefFlags.SHOW_CURSOR))
        {
            showCursor();
        }

        if(this.hasFlag(eCefFlags.FREEZE_PLAYER))
        {
            disableControls();
        }
    }

    hide()
    {
        this.view.isVisible = false;
        this.view.unfocus();
        hideCursor();
        enableControls();
    }
    
    close(callback = function() {})
    {
        this.hide();
        if(this.isOpened()) 
        {   
            
            this.view.destroy();
        }
        
        this.view = null;
        
        enableControls();
        hideCursor();

        callback();
    }

    hasFlag(flag)
    {
        return this.flags.indexOf(flag) != -1;
    }
};

