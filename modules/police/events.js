//touches = https://github.com/crosire/scripthookvdotnet/blob/dev_v3/source/scripting/Game/Control.cs
// https://pastebin.com/guYd0ht4
// https://wiki.rage.mp/index.php?title=Controls
import * as alt from 'alt';
import * as game from 'natives';
import * as police from "modules/police/main"
const anim = { dict: 'mp_arresting', name: 'idle' }
alt.onServer('setHandcuff', (value) => {
    if (value == undefined) {
        value = !police.handcuffed;
    }
    if (value == true) {
        police.putHandcuff();
        alt.emit('disableKeys', true);
    }
    else {
        police.removeHandcuff();
        alt.emit('disableKeys', false);
    }
});
alt.on('update', () => {
    if (police.handcuffed) {
        alt.log(game.isEntityPlayingAnim(game.playerPedId(), anim.dict, anim.name, 3))
        if (!game.isEntityPlayingAnim(game.playerPedId(), anim.dict, anim.name, 3)) {
            police.putHandcuff();
        }
        game.setPedPathCanUseLadders(game.playerPedId(), false)
        game.disableControlAction(0, 142, true) // MeleeAttackAlternat
        game.disableControlAction(0, 24, true) //Shoot 
        game.disableControlAction(0, 92, true) //Shoot in car
        //game.disableControlAction(0, 75, true) // Leave Vehicle
        game.disableControlAction(0, 45, true) // Reload
        game.disableControlAction(0, 140, true) // alternative
        game.disableControlAction(0, 141, true) // alternative
        game.disableControlAction(0, 142, true) // alternative
        game.disableControlAction(0, 143, true) // alternative
        if (game.isPedInAnyVehicle(game.playerPedId(), false)) {
            game.disableControlAction(0, 59, true) // droiger gauche veh
        }
    }


})