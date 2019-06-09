import * as game from 'natives';
import * as alt from 'alt';

import * as cef from 'modules/cef/main';
import * as graphics from 'modules/graphics/main';

export function freeze(value) {
    game.freezeEntityPosition(game.playerPedId(), value);
    //setControlsEnabled(value);
}

export function loadModel(model) {
    if (game.isModelValid(model)) {
        alt.log('valid model');
        game.requestModel(model);
        return new Promise((resolve, reject) => {

            let check = alt.setInterval(() => {

                if (game.hasModelLoaded(model)) {
                    alt.clearInterval(check);
                    alt.log('Model loaded');
                    resolve(true);
                }

            }, (5));
        });
    } else {
        alt.log('invalid model')
    }
}

export function loadContext() {

    let events = {};

    events['chatmessage'] = (c) => {
        alt.emit('chatmessage', c);
    };

    events['hide'] = () => {
        graphics.stopScreenEffect('ChopVision');
        alt.setTimeout(() => {
            cef.getView('context').close();
        }, 200);
    }

    events['blurin'] = () => {
        graphics.startScreenEffect('ChopVision', 0, true);
    };


    cef.createView('context', 'base/uis/context/context.html', events, [cef.eCefFlags.SHOW_CURSOR, cef.eCefFlags.FREEZE_PLAYER]);
}
export function openContext(callback = () => { })
{
    cef.getView('context').open(callback);
}
export function hideContext()
{
    cef.getView('context').close();
}
export function toggleContext()
{
    if(cef.getView('context').isOpened())
    {
        if(cef.getView('context').view.isVisible)
        {
            hideContext();
        } else {
            openContext();
        }
    } else {
        openContext();
    }
}

export function loadInteraction()
{
    let events = {};
    
    events['chatmessage'] = (c) => {
        alt.emit('chatmessage', c);
    };

    events['hide'] = () => {
        closeInteraction();
    }

    cef.createView('interaction', 'base/uis/interaction/interaction.html', events,[cef.eCefFlags.SHOW_CURSOR, cef.eCefFlags.FREEZE_PLAYER]);
}
export function openInteraction(callback = () => { })
{
    cef.getView('interaction').open(callback);
}
export function closeInteraction()
{
    cef.getView('interaction').close();
}

loadContext();
loadInteraction();