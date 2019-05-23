import game from 'natives';
import alt from 'alt';

export function freeze(value) {
    game.freezeEntityPosition(game.playerPedId(), value);
    //setControlsEnabled(value);
}
export function ragdoll() {
    game.setPedToRagdoll(game.playerPedId(), 1000, 1000, 0, 0, 0, 0);
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