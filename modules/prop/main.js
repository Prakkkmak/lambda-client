import * as game from 'natives';
import * as alt from 'alt';
import * as notification from 'modules/notification/main'
export async function spawnProp(propName, x, y, z) {
    let propHash = game.getHashKey(propName);
    try {
        await loadProp(propHash);
    }
    catch (err) {
        alt.log(err);
        return;
    }
    alt.log("loaded");
    let heading = game.getEntityHeading(game.getPlayerPed(-1));
    alt.log(x + " " + y + " " + z - 2)
    let prop = game.createObject(propHash, x, y, z - 2, true, true, true);
    game.placeObjectOnGroundProperly(prop);
    game.setEntityHeading(prop, heading);
    game.attachEntityToEntity(prop, game.getPlayerPed(-1), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    alt.log("placed");
    notification.showNotification('Prop placé');
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