import * as game from 'natives';
import * as alt from 'alt';
import * as notification from 'modules/notification/main'

let props = []

export async function spawnProp(propIdentity,propName, propPos, propRotation) {
    let propHash = game.getHashKey(propName);
    try {
        await loadProp(propHash);
    }
    catch (err) {
        alt.log(err);
        return;
    }
    alt.log(props.length);
    props.forEach((p) => {
        if(p.identity == propIdentity){
            game.deleteObject(p.prop);
            props.splice(props.indexOf(p), 1);
            return;
        }
    })
    // Create the prop
    let heading = game.getEntityHeading(game.getPlayerPed(-1));
    let prop = game.createObject(propHash, propPos.x, propPos.y, propPos.z, true, true, true);
    //game.placeObjectOnGroundProperly(prop);
    game.setEntityHeading(prop, propRotation.yaw);
    alt.log("heading" + game.getEntityHeading(prop));
    //game.attachEntityToEntity(prop, game.getPlayerPed(-1), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    props.push({identity: propIdentity, prop: prop});
    //notification('Prop placé');
   
}

export function loadProp(propHash) {
    return new Promise((resolve, reject) => {
        //resolve(true);
        let nbtry = 0;
        if (!game.isModelValid(propHash)) alt.log("Model not valid");
        game.requestModel(propHash);
        let check = alt.setInterval(() => {
            nbtry++;
            if (game.hasModelLoaded(propHash)) {
                alt.clearInterval(check);
                resolve(true);
            }
            if (nbtry >= 100) {
                reject("Model not loaded after " + nbtry + " try");
            }
        }, (10));
    });
}