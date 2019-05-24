//touches = https://github.com/crosire/scripthookvdotnet/blob/dev_v3/source/scripting/Game/Control.cs
// https://pastebin.com/guYd0ht4
// https://wiki.rage.mp/index.php?title=Controls
import alt from 'alt';
import game from 'natives';
import * as police from "modules/police/main"
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

        game.disableControlAction(0, 142, true) // MeleeAttackAlternat
        game.disableControlAction(0, 24, true) //Shoot 
        game.disableControlAction(0, 92, true) //Shoot in car
        game.disableControlAction(0, 75, true) // Leave Vehicle
        if (game.isPedInAnyVehicle(game.playerPedId(), false)) {
            game.disableControlAction(0, 59, true)
        }
    }


})