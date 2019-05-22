/// <reference path="definitions/altv-client.d.ts" />
import alt from 'alt';
import game from 'natives';
import * as skin_changer from "modules/skin/uis/skin_changer"
import * as base from "modules/base/main";
import * as character from 'modules/character/main';

const key_codes =
{
    'L': 76,
    'K': 75,
    'U': 85,
    'E': 69,
    'A': 65,
    'T': 84,
    'Esc': 27,
    'Enter': 13,
    'Numpad_0': 96,
    'Numpad_1': 97,
    'Numpad_2': 98,
    'Numpad_3': 99,
    'Numpad_4': 100,
    'Numpad_5': 101,
    'Numpad_6': 102,
    'Numpad_7': 103,
    'Numpad_8': 104,
    'Numpad_9': 105,
    '=': 187,
    'power2': 222
};

const inputs_action = {
    98: skin_changer.selectPrevious,
    100: skin_changer.previousSelected,
    101: skin_changer.save,
    102: skin_changer.nextSelected,
    104: skin_changer.selectNext,
    187: base.ragdoll,
    222: character.openCharacterCustom
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