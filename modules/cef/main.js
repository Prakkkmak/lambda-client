import alt from 'alt';

var opened_cefs = [];
var cursor = false;
var controls = true;
var console = false;

export const eCefFlags = {
    FREEZE_PLAYER: 'freeze',
    SHOW_CURSOR: 'cursor'
}

export function createView(id, path, events, flags)
{
    let found = false;
    opened_cefs.forEach((cef) => {
        if(cef.id === id)    
        {
            found = true;
        }
    });

    if(!found)
    {
        opened_cefs.push(new CEF(id, path, events, flags));
    } else {
        alt.log('CEF id already taken');
    }
}
export function isOpened(id)
{
    for(let i=0;i<opened_cefs.length;i++)
    {
        if(opened_cefs[i].id === id)    
        {
            if(opened_cefs[i].view != null) return true;
        }
    }
    return false;
}
export function getView(id)
{
    for(let i=0;i<opened_cefs.length;i++)
    {
        if(opened_cefs[i].id === id)
        {
            return opened_cefs[i];
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
        for(let i=0;i<opened_cefs.length;i++)
        {
            if(opened_cefs[i].isOpened() && opened_cefs[i].hasFlag(eCefFlags.SHOW_CURSOR))
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
        alt.toggleGameControls(false);
        controls = false;
    }
}
export function enableControls()
{
    if(!controls)
    {
        for(let i=0;i<opened_cefs.length;i++)
        {
            if(opened_cefs[i].isOpened() && opened_cefs[i].hasFlag(eCefFlags.FREEZE_PLAYER))
            {
                return;
            }
        }

        alt.toggleGameControls(true);
        controls = true;
    }
}


export class CEF
{
    constructor(id, path, events, flags)
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
    
            this.setFocusOn();
    
            if(this.hasFlag(eCefFlags.SHOW_CURSOR))
            {
                showCursor();
            }
    
            if(this.hasFlag(eCefFlags.FREEZE_PLAYER))
            {
                disableControls();
            }
    
            callback();
        }
    }
    
    close(callback = function() {})
    {
        if(this.isOpened()) this.view.destroy();
        this.view = null;
        
        enableControls();
        hideCursor();

        callback();
    }

    setFocusOn()
    {
        this.view.focus();
    }
    
    hasFlag(flag)
    {
        return this.flags.indexOf(flag) != -1;
    }
};

