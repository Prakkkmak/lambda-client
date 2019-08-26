import * as alt from 'alt';
import * as base from "modules/base/main"
import * as skin from "modules/skin/main"
import * as cef from 'modules/cef/main';

alt.onServer('setFreeze', (value) => {
    base.freeze(value);
});

alt.onServer('playerLoaded', () => {
    //skin.setHeadBlendData(0, 0, 0, 0, 0.5, 0.5);
});

alt.onServer('setContextActions', (json) => {
    if(JSON.parse(json).length > 0)
    {
        base.openContext(() => {
            alt.log('onParse Send');
            
            alt.setTimeout(() => {
                cef.getView('context').view.emit('onParse', json); 
            }, 200);
            //cef.getView('context').view.execJS(`button_parser('${json}')`)
            alt.log('onParse Sent');
        });
    }
    
    
    alt.log(json);
});

alt.onServer('setInteraction', (a,b,c,d) => {
    base.openInteraction(() => {
        cef.getView('interaction').view.emit('onInteraction', a,b,c,d);
    });
});

alt.onServer('consoleLog', (text) => {
    alt.log(text);
});

alt.onServer('consoleError', (text) => {
    alt.logError(text);
});

alt.onServer('consoleWarning', (text) => {
    alt.logWarning(text);
});

// alt.on('consoleCommand', (command, ...args) => {
//     if(command == 'interaction')
//     {
//         base.openInteraction(() => {
//             cef.getView('interaction').view.emit('onInteraction', args[0], args[1], args[2], args[3]);
//         });
//     }
// });