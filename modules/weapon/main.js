/// <reference path="../../definitions/altv-client.d.ts" />
import alt from 'alt'
import * as game from 'natives';
export function giveAllWeapons() {
    let player = alt.Player.local.scriptID;
    for (const weapon of weapons) {
        game.giveWeaponToPed(player, game.getHashKey(weapon), 9999, false, false)
    }
}
export function giveWeapon(weapon) {
    alt.log("weapon give " + weapon);
    let player = alt.Player.local.scriptID;
    game.giveWeaponToPed(player, game.getHashKey(weapon), 9999, false, false);
}