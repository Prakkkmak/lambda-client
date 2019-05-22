/// <reference path="definitions/altv-client.d.ts" />
import alt from 'alt';
import game from 'natives';
import * as skin_changer from "modules/skin/uis/skin_changer"
import * as base from "modules/base/main";

const inputs_action = {
    98: skin_changer.selectPrevious,
    100: skin_changer.previousSelected,
    101: skin_changer.save,
    102: skin_changer.nextSelected,
    104: skin_changer.selectNext,
    187: base.ragdoll,
}

let input_enabled = false;

alt.on('keydown', (key) => {
    if (key == 222) {
        input_enabled = !input_enabled;
        if (input_enabled) alt.emit('chatmessage', null, "Vous avez activé les touches");
        else alt.emit('chatmessage', null, "Vous avez désactivé les touches");
    }
    if (input_enabled && inputs_action[key]) {
        alt.log("Action : " + key + " triggered");
        inputs_action[key]();
    }

});

export function input_check() {
    /*if (game.isControlJustPressed(0, 100)) {
        skin_changer.selectNext();
    }
    if (game.isControlJustPressed(0, 102)) {
        skin_changer.selectPrevious();
    }*/
}