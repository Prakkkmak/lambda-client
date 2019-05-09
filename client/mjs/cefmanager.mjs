import alt from 'alt';

var cefs = [];
var cursor = false;
var controls = true;


function createView(id, path, freeze, cursor, events)
{
    let found = false;
    cefs.forEach((cef) => {
        if(cef.id === id)    
        {
            found = true;
        }
    });

    if(!found)
    {
        cefs.push(new CEF(id, path, freeze, cursor, events));
    } else {
        alt.log('CEF id already taken');
    }
}

function isOpened(id)
{
    for(let i=0;i<cefs.length;i++)
    {
        if(cefs[i].id === id)    
        {
            if(cefs[i].view != null) return true;
        }
    }
    return false;
}

function getView(id)
{
    for(let i=0;i<cefs.length;i++)
    {
        if(cefs[i].id === id)
        {
            alt.log('getView : ' + cefs[i].id);
            return cefs[i];
        }
    }

    return undefined;
}

function showCursor()
{
    if(!cursor) {
        alt.showCursor(true);
        cursor = true;
    }
    
}

function hideCursor()
{
    if(cursor)
    {
        for(let i=0;i<cefs.length;i++)
        {
            if(cefs[i].isOpened() && cefs[i].cursor)
            {
                return;
            }
        }
        alt.showCursor(false);
        cursor = false;
        }
}

class CEF
{
    constructor(id, path, freeze, cursor, events)
    {
        this.id = id;
        this.path = 'http://resources/lambda-client/client/html/'+path;
        this.freeze = freeze;
        this.cursor = cursor;
        this.view = null;
        this.events = events;
    }

    

    openView()
    {
        this.view = new alt.WebView(this.path);
        
        Object.keys(this.events).forEach((key) => {
            this.view.on(key, this.events[key]);
        });

        this.setFocusOn();

        if(this.cursor)
        {
            showCursor();
        }
    }

    isOpened()
    {
        return this.view !== null;
    }

    closeView()
    {
        if(this.view !== null) this.view.destroy();
        this.view = null;

        hideCursor();
    }

    setFocusOn()
    {
        this.view.focus();
    }
};



export default {CEF, cefs, isOpened, getView, createView};