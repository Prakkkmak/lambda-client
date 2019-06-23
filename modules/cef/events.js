import * as alt from 'alt';
import * as game from 'natives';

import * as cef from 'modules/cef/main';
import * as base from 'modules/base/main';

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


alt.on('consoleCommand', (command, ...args) => {
    if(command == 'opencef') 
    {
        cef.getView(args[0]).open( () => {
            
        });
    } else if(command == 'closecef')
    {
        cef.getView(args[0]).close();
    } else if(command == 'openinworld')
    {
        alt.log(game.getHashKey(args[0]));

        let view = new alt.WebView(args[0], game.getHashKey(args[1]), args[2]);
    }
});