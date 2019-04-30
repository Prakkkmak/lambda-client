﻿import alt from 'alt';
import game from 'natives';



/* Vars */
const weapons = [
    "WEAPON_KNIFE", "WEAPON_BAT", "WEAPON_BOTTLE", "WEAPON_WRENCH",
    "WEAPON_PISTOL", "WEAPON_HEAVYPISTOL", "WEAPON_REVOLVER",
    "WEAPON_MICROSMG", "WEAPON_SMG", "WEAPON_COMBATPDW",
    "WEAPON_ASSAULTRIFLE", "WEAPON_CARBINERIFLE",
    "WEAPON_PUMPSHOTGUN"
];
const keys =
{
    'L': 76,
    'K': 75,
    'U': 85,
    'Numpad_0': 96,
    'Numpad_1': 97,
    'Numpad_2': 98,
    'Numpad_3': 99,
    'Numpad_4': 100,
    'Numpad_5': 101,
    'Numpad_6': 102,
    'Numpad_7': 103,
    'Numpad_8': 104,
    'Numpad_9': 105
};

/* Init */
game.setPedDefaultComponentVariation(game.playerPedId(), true);
alt.emitServer("setlicense", alt.getLicenseHash());

//#region webviews
//let contextView = new alt.WebView("http://resources/lambda_client/client/html/context/context.html");
//let skinchangerView = new alt.WebView("http://resources/lambda_client/client/html/skinvalidation/skinvalidation.html");

//#endregion

//alt.emitServer('toto', ["MONTEXTE"]);

let autorandom = false;
let skinenabled = false;
let playerFreezed = false;
let selected = 1;
giveWeapons();
//#region event_context
/*contextView.on('chatmessage', (text) => {
    //Evènement appelé un bouton de commande est cliqué
    alt.emitServer('chatmessage', text);
});*/
//#endregion
//#region event_skin
/*skinchangerView.on('chatmessage', (text) => {
    //Evènement appelé un bouton de commande est cliqué
    alt.emitServer('chatmessage', text);
}); skinchangerView.on('chatmessage', (text) => {
    //Evènement appelé un bouton de commande est cliqué
    alt.emitServer('chatmessage', text);
});
skinchangerView.on('skinchange', (text) => {
    alt.emitServer('chatmessage', "!vetements " + text);
});*/
alt.onServer('setSkin', (args) => {
    for (var i = 0; i < 11; i++) {
        game.setPedComponentVariation(game.playerPedId(), i + 1, args[i], 0, 0)
    }
})
alt.onServer('loadipl', (arg) => {
    alt.requestIpl(arg);
    alt.log("IPL loaded > " + arg);
})
alt.onServer('unloadipl', (arg) => {
    alt.removeIpl(arg);
    alt.log("IPL unloaded > " + arg);
})
//#endregion
//#region event_general

let chatopen = false;

alt.on('keydown', (key) => {
    if (key == 84) {
        chatopen = true;
    }
    if (key == 13 || key == 27) {
        chatopen = false;
    }
    if (!chatopen) {
        if (key == 103) autorandom = !autorandom;
        if (key == 69) {
            alt.emitServer('chatmessage', "/tp");
        }
        if (key == 222) {
            skinenabled = !skinenabled;
        }
        if (skinenabled) {
            if (key == 102) {
                alt.emitServer('chatmessage', "/vetement suivant " + selected);
            }
            if (key == 100) {
                alt.emitServer('chatmessage', "/vetement precedent " + selected);
            }
            if (key == 104) {
                if (selected < 10) {
                    selected++;
                }
                else {
                    selected = 0;
                }
                alt.emitServer('chatmessage', "Slot selectioné: " + elems[selected]);
            }
            if (key == 98) {
                if (selected > 0) {
                    selected--;
                }
                else {
                    selected = 10;
                }
                alt.emitServer('chatmessage', "Slot selectioné: " + elems[selected]);
            }
            if (key == 99) {
                alt.emitServer('chatmessage', "/vetement valider");
            }
            if (key == 97) {
                alt.emitServer('chatmessage', "/vetement mauvais");
            }
            if (key == 101) {
                alt.emitServer('chatmessage', "/vetement tester");
            }
            if (key == 105) {
                alt.emitServer('chatmessage', "/vetement gen");
            }

        }
    }

});
//#endregion


alt.onServer('giveAllWeapons', () => {
    giveWeapons();
});
alt.onServer('tata', (args) => {
    alt.log("tata TRIGGERED");
});


/* Functions */
function giveWeapons() {
    let ped = game.playerPedId()

    for (const weapon of weapons) {
        game.giveWeaponToPed(ped, game.getHashKey(weapon), 9999, false, false)
    }
}
/**
 * Permet de bloquer les contrôles du joueur
 *
 * @param {boolean}   value           Est bloqué ou non.
 */
function setFreeze(value) {
    if (!playerFreezed) {
        playerFreezed = value;
        alt.setCamFrozen(value);
        alt.toggleGameControls(!value);
        alt.showCursor(value);
    }
}

function setNativeFreeze(value) {
    game.freezeEntityPosition(game.playerPedId(), value) // 428CA6DBD1094446 65C16D57
}
/**
 * Permet de focus une WebView (cef)
 *
 * @param {WebView}   web           La WebView à focus.
 */
function setFocusOn(web) {
    if (!playerFreezed) {
        web.focus(web);
    }
}


/*let d = new Date();
let n = d.getTime();
alt.on('update', () => {
    if (autorandom) {
        d = new Date()
        if (d.getTime() - n > 3000) {
            n = d.getTime();
            alt.emitServer('chatmessage', "/vetement ale");
        }
    }

});*/

/**
 * Customs events de prakk
 * A ajouter proprement sur le client side
 * Utilisé  pour gagné du temps
 */

alt.onServer('freeze', (args) => {
    setNativeFreeze(true);
    alt.toggleGameControls(false);
});

alt.onServer('unfreeze', (args) => {
    setNativeFreeze(false);
    alt.toggleGameControls(true);
});

alt.initVoice();
alt.setMicGain(1);
alt.log("voice on");
alt.enableVoiceInput();
/*alt.on('update', () => {
    if (game.isControlJustPressed(0, 78)) { //N
        alt.log("voice on");
        alt.enableVoiceInput();
    }
    else if (game.isControlJustReleased(0, 78)) { //N
        alt.disableVoiceInput();
    }
});*/

var elems = [
    "masque", "cheveux", "torse", "jambe", "sac", "pieds", "accessoire", "sous-haut", "armure", "détail", "haut"
]