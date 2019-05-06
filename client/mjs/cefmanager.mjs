import alt from 'alt';

let cefs = [];

class CEF
{
    
    constructor(id, path, freeze)
    {
        this.id = id;
        this.path = path;
        this.freeze = freeze;
        this.view = null;
    }

    openView()
    {
        this.view = new alt.WebView(this.path);
        
        cefs.push(this);
    }

    closeView()
    {
        this.view.destroy();
        this.view = null;
        cefs.splice(cefs.indexOf(this), 1);
    }

};