import * as alt from 'alt';
import * as game from 'natives';
import { playAnim } from "modules/anim/main"

const anim = { dict: 'mp_arresting', name: 'idle' }
export let handcuffed = false;
export function putHandcuff() {
    var player = game.playerPedId();
    game.clearPedTasksImmediately(player);
    playAnim(anim.dict, anim.name, 49);
    game.setEnableHandcuffs(player, true);
    game.setCurrentPedWeapon(player, game.getHashKey("WEAPON_UNARMED"), true);
    game.setPedPathCanUseLadders(player, false)
    handcuffed = true;
}
export function removeHandcuff() {
    var player = game.playerPedId();
    game.clearPedSecondaryTask(player);
    game.setEnableHandcuffs(player, false);
    game.setCurrentPedWeapon(player, game.getHashKey("WEAPON_UNARMED"), true);
    handcuffed = false;
}