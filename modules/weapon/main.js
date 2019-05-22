/// <reference path="../../definitions/altv-client.d.ts" />
import alt from 'alt'
import game from 'natives';
export function giveAllWeapons() {
    let player = game.playerPedId();
    for (const weapon of weapons) {
        game.giveWeaponToPed(player, game.getHashKey(weapon), 9999, false, false)
    }
}
export function giveWeapon(weapon) {
    alt.log("weapon give " + weapon);
    let player = game.playerPedId();
    game.giveWeaponToPed(player, game.getHashKey(weapon), 9999, false, false);
}