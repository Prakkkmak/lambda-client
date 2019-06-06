
import * as game from 'natives';

let blips = []

export function attachBeaconToPlayer(player) {
    let blip = game.addBlipForEntity(player.scriptID);
    game.setBlipSprite(blip, 103);
    game.setBlipColour(blip, 1);
    game.setBlipScale(blip, 1.5);
    game.pulseBlip(blip);
    blips[player.scriptID] = blip;
}
export function dettachBeaconToPlayer(player) {
    let blip = blips[player.scriptID];
    if (blip) {
        game.removeBlip(blip);
    }

}