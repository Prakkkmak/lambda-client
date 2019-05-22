import alt from 'alt';
import game from 'natives';
import { loadAnimDict } from "modules/anim/main"

const anim = { dict: 'mp_arresting', name: 'idle' }
export let handcuffed = false;
export function putHandcuff() {
    var player = game.playerPedId();
    game.clearPedTasksImmediately(player);
    loadAnimDict(anim.dict).then(() => {
        game.taskPlayAnim(player, anim.dict, anim.name, 8.0, -8, -1, 49, 0, 0, 0, 0)
    });
    game.setEnableHandcuffs(player, true);
    game.setCurrentPedWeapon(player, game.getHashKey("WEAPON_UNARMED"), true);
    handcuffed = true;
}
export function removeHandcuff() {
    var player = game.playerPedId();
    game.clearPedSecondaryTask(player);
    game.setEnableHandcuffs(player, false);
    game.setCurrentPedWeapon(player, game.getHashKey("WEAPON_UNARMED"), true);
    handcuffed = false;
}