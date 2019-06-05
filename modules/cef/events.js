import alt from 'alt';
import * as cef from 'modules/cef/main';

alt.onServer('openCef', (view) => {
    cef.getView(view).open();
});
alt.onServer('closeCef', (view) => {
    cef.getView(view).close();
});

alt.onServer('playerLoaded',() => {
    if(!alt.gameControlsEnabled())
    {
        alt.log('console opened');
    
        cef.openConsole();
    } else {
        alt.log('console closed');
    }
});
