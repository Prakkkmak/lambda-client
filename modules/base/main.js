import * as game from 'natives';
import * as alt from 'alt';

import * as cef from 'modules/cef/main';


export function freeze(value) {
    game.freezeEntityPosition(game.playerPedId(), value);
    //setControlsEnabled(value);
}

export function loadModel(model)
{
    if(game.isModelValid(model))
    {
        alt.log('valid model');
        game.requestModel(model);
        return new Promise((resolve, reject) => {
            
            let check = alt.setInterval(() => {
                
                if(game.hasModelLoaded(model))
                {
                    alt.clearInterval(check);
                    alt.log('Model loaded');
                    resolve(true);
                }
                
            },(5));
        });
    } else 
    {
        alt.log('invalid model')
    }
}

export function loadContext() {

    let events = {};
    
    events['chatmessage'] = (c) => {
        alt.emit('chatmessage', c);
    };

    events['hide'] = (arg) => {
        cef.getView('context').hide();
    }

    cef.createView('context', 'base/uis/context/context.html', events,[cef.eCefFlags.SHOW_CURSOR, cef.eCefFlags.FREEZE_PLAYER]);
}
export function openContext()
{
    cef.getView('context').open();
}
export function hideContext()
{
    cef.getView('context').hide();
}

export function toggleContext()
{
    if(cef.getView('context').isOpened())
    {
        if(cef.getView('context').view.isVisible)
        {
            hideContext();
        } else 
        {
            openContext();
        }
    } else {
        openContext();
    }
}
loadContext();
