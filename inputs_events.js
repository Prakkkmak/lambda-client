/// <reference path="definitions/altv-client.d.ts" />
import * as alt from 'alt';
import * as game from 'natives';

import * as skin_changer from "modules/skin/uis/skin_changer"
import * as skin from 'modules/skin/main';
import * as base from "modules/base/main";
import * as character from 'modules/character/main';
import * as cef from 'modules/cef/main';
import * as admin from 'modules/admin/main';
import * as physics from 'modules/physics/main';
import * as camera from 'modules/camera/main';
import * as graphics from 'modules/graphics/main';
import * as selection from 'modules/selection/main';
import * as audio from 'modules/audio/main';

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
    'power2': 222,
    'F8': 119
};

let chat_open = false;
let input_enabled = false;
let isDisabled = false;

const inputs_action = {

    
    85: admin.dashToCam,
    97: skin_changer.previousSelectedPalette,
    98: skin_changer.selectPrevious,
    99: skin_changer.nextSelectedPalette,
    100: skin_changer.previousSelected,
    101: skin_changer.save,
    102: skin_changer.nextSelected,
    103: skin_changer.previousSelectedTexture,
    104: skin_changer.selectNext,
    105: skin_changer.nextSelectedTexture,
    106: selection.enableDebugSphere,
    107: selection.getRotation,
    187: character.ragdoll,
    188: selection.updateClose
}

function openChat() {
    chat_open = true;
}
function closeChat() {
    chat_open = false;
}

alt.on('disableKeys', (bool) => {
    isDisabled = bool;

});
alt.on('keydown', (key) => {
    if (key == 222) {
        input_enabled = !input_enabled;
        if (input_enabled) alt.emit('chatmessage', null, "Vous avez activé les touches");
        else alt.emit('chatmessage', null, "Vous avez désactivé les touches");
    }
    if (key == 84) {
        if (!chat_open) chat_open = true;
    }
    if (key == 13 || key == 27) {
        chat_open = false;
    }
    if (input_enabled && !chat_open && !isDisabled && inputs_action[key]) {
        inputs_action[key]();
    }

    if (key == 119) {
        cef.toggleConsole();
    }
});

export function input_check() {
    // INPUT_PUSH_TO_TALK 249
    if (game.isControlJustPressed(0, 249)) {
        alt.enableVoiceInput();
        alt.log("Voice on");
    }
    if (game.isControlJustReleased(0, 249)) {
        alt.disableVoiceInput();
        alt.log("Voice off");
    }
}