import alt from 'alt';
import game from 'natives';
import animation from 'client/mjs/animation.mjs';
import cef from 'client/mjs/cefmanager.mjs';
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
const ped_bones =
{
    'IK_Head': 0x322c,
    'SKEL_Head ': 0x796E,
    'FACIAL_facialRoot': 0xFE2C,
    'SKEL_Spine2': 0x60f1,
    'SKEL_Root': 0x0
};
var elems = ["tete", "masque", "cheveux", "torse", "jambe", "sac", "pieds", "accessoire", "sous-haut", "armure", "détail", "haut"];

//#region webviews
let contextView = null;
let skinchangerView = null;

let animationsView = null;
//#endregion
let cursorVisible = false;

class SpotLight {

    constructor(_x, _y, _z) {
        this.position =
            {
                x: _x,
                y: _y,
                z: _z
            };
        this.direction =
            {
                x: 0,
                y: 0,
                z: 0
            };
        this.color =
            {
                r: 255,
                g: 0,
                b: 255
            };
        this.brightness = 100;
        this.distance = 255;
        this.hardness = 0;
        this.radius = 13;
    }
};
const rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

let spotlights = [];
let cam = null;

/* Init */
start();


alt.onServer('setComponent', (argsDrawable, argsTexture, argsPalette) => {
    setComponentVariation(argsDrawable, argsTexture, argsPalette);
});
alt.onServer('setHeadOverlay', (argsIndex, argsOpacity) => {
    setHeadOverlay(argsIndex, argsOpacity);
});
alt.onServer('setProps', (argsDrawable, argsTexture) => {
    setProps(argsDrawable, argsTexture);
});
alt.onServer('setFreeze', (value) => {
    freezePlayer(value);
});
alt.onServer('giveAllWeapons', () => {
    giveAllWeapons();
});
alt.onServer('setWorldTime', (h, m, s) => {
    alt.setClockTime(h, m, s);
});
alt.onServer('loadIpl', (ipl) => {
    loadIPL(ipl);
    alt.log("IPL loaded > " + ipl);
});
alt.onServer('unloadIpl', (ipl) => {
    unloadIPL(ipl);
    alt.log("IPL unloaded > " + ipl);
});
alt.onServer('openView', (viewName) => {
    if (viewName == 'characterCustom') {
        loadCharacterCustom();
    }
});
alt.onServer('loadAnimDict', (dict) => {
    animation.loadAnimDict(dict);
});
alt.onServer('playAnim', (dict, anim, flag) => {
    animation.playAnim(dict, anim, flag);
});
//#endregion


let chatopen = false;
let skinenabled = false;
let selected = 0;
//#region event_general
alt.on('keydown', (key) => {
    //Touche de clavier enfoncée
    if (key == keys.T) {
        chatopen = true;
    }
    if (key == keys.Enter || key == keys.Esc) {
        chatopen = false;
    }

    if (!chatopen) {
        if (key == keys.power2) {
            skinenabled = !skinenabled;
        }
        else if (skinenabled) {
            vetementChanger(key);
        }
        
    }
});

function start() {
    setModel("Male");
    goBackToGameplayCam();
    giveAllWeapons();
    alt.emitServer("setlicense", alt.getLicenseHash());

    alt.initVoice();
    alt.setMicGain(1);
    alt.log("Voice on");
    alt.enableVoiceInput();

    game.requestAnimDict("misscarstealfinalecar_5_ig_3");
}
/* Functions */
function giveAllWeapons() {
    let ped = game.playerPedId();

    for (const weapon of weapons) {
        game.giveWeaponToPed(ped, game.getHashKey(weapon), 9999, false, false)
    }
}
/**
 * Permet de bloquer les contrôles du joueur
 *
 * @param {boolean}   value           Est bloqué ou non.
 */
function setControlsEnabled(value) {
    if (alt.gameControlsEnabled != value) {
        alt.toggleGameControls(value);
    }
}
function freezePlayer(value) {
    game.freezeEntityPosition(game.playerPedId(), value);
    setControlsEnabled(value);
}
function setCursorVisible(value) {
    if (cursorVisible != value) {
        alt.showCursor(value);
        cursorVisible = value;
    }
}

function setModel(model) {
    if (model.toLowerCase() == "male") {
        model = game.getHashKey("mp_m_freemode_01");
    } else if (model.toLowerCase() == "female") {
        model = game.getHashKey("mp_f_freemode_01");
    } else {
        model = game.getHashKey(model);
    }

    game.requestModel(model);

    alt.setTimeout(() => {
        game.setPlayerModel(game.playerId(), model);
        game.setPedDefaultComponentVariation(game.playerPedId());
        game.setPedHeadBlendData(game.playerPedId(), 0, 0, 0, 0, 0, 0, 0, 0, 0, true);
    }, 100);
}
function setHairColor(colorID, highlightColorID) {
    alt.log("setHairColor " + colorID);
    game.setPedHairColor(game.playerPedId(), colorID, highlightColorID);
}
function setHeadOverlay(argsIndex, argsOpacity) {
    for (var i = 0; i < 13; i++) {
        if (argsIndex[i] != null && argsOpacity[i] != null) {
            game.setPedHeadOverlay(game.playerPedId(), i, argsIndex[i], argsOpacity[i]);
        }
    }
}
function setHeadOverlayColor(argsColor) {
    for (let i = 0; i < 13; i++) {
        if (argsColor[i] != null) {
            if (i == 1 || i == 10 || i == 2) {
                game.setPedHeadOverlayColor(game.playerPedId(), i, 1, argsColor[i], argsColor[i]);
            } else if (i == 5 || i == 8) {
                game.setPedHeadOverlayColor(game.playerPedId(), i, 2, argsColor[i], argsColor[i]);
            } else {
                game.setPedHeadOverlayColor(game.playerPedId(), i, 0, argsColor[i], argsColor[i]);
            }
        }
    }
}
function setProps(argsDrawable, argsTexture) {
    for (var i = 0; i < 3; i++) {
        if (argsDrawable[i] != null && argsTexture[i] != null) {
            game.setPedPropIndex(game.playerPedId(), prodComponentIds[i], argsDrawable[i], argsTexture[i], true);
        }
    }
}
function setComponentVariation(argsDrawable, argsTexture, argsPalette) {

    if (argsDrawable == null) argsDrawable = new Array(12).fill(0);
    if (argsTexture == null) argsTexture = new Array(12).fill(0);
    if (argsPalette == null) argsPalette = new Array(12).fill(0);
    for (var i = 0; i < 12; i++) {
        game.setPedComponentVariation(game.playerPedId(), i, argsDrawable[i], argsTexture[i], argsPalette[i]);
    }
}
function setFaceFeature(argsIndex, argsScale) {
    for (let i = 0; i < 20; i++) {
        game.setPedFaceFeature(game.playerPedId(), key, value);
    }
}
function requestHairColors(web, id, container, size, callback) {
    let colors = new Array(game.getNumHairColors());
    for (let i = 0; i < game.getNumHairColors(); i++) {
        let [_, r, g, b] = game.getHairColor(i, 0, 0, 0);
        colors[i] = "'#" + rgbToHex(r) + rgbToHex(g) + rgbToHex(b) + "'";
    }

    web.execJS(`add_colorpicker('${id}','${container}',${size},[${colors}], ${callback})`);
}


//#endregion
//#region KEY CONTROLS
function vetementChanger(key) {
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
//#endregion
//#region CAM FUNCTIONS
function createCam(position, rotation, fov) {
    alt.nextTick(() => {
        cam = game.createCam('DEFAULT_SCRIPTED_CAMERA', false);
        game.setCamCoord(cam, position.x, position.y, position.z);
        game.setCamRot(cam, rotation.x, rotation.y, rotation.z);
        game.setCamActive(cam, true);
        game.setCamFov(cam, fov);
    });

    return cam;
}
function focusOnBone(bone, offset, fov, easeTime) {
    bone = (typeof (bone) == 'string') ? ped_bones[bone] : bone;
    if (cam == null) {
        createCam({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, fov);
        alt.nextTick(() => {
            game.attachCamToPedBone(cam, game.playerPedId(), bone, offset.x, offset.y, offset.z, true);
            game.pointCamAtPedBone(cam, game.playerPedId(), bone, 0, 0, 0, true);
            game.renderScriptCams(true, true, easeTime, true, false);
        });
    } else {
        alt.nextTick(() => {
            game.setCamActive(cam, true);
            game.renderScriptCams(true, true, easeTime, true, false);
            game.setCamFov(cam, fov);
            game.attachCamToPedBone(cam, game.playerPedId(), bone, offset.x, offset.y, offset.z, true);
            game.pointCamAtPedBone(cam, game.playerPedId(), bone, 0, 0, 0, true);
        });
    }
}
function goBackToGameplayCam() {

    alt.nextTick(() => {

        game.setCamActive(cam, false);
        game.destroyAllCams(false);
        cam = null;
        game.renderScriptCams(false, false, 0, true, true);
    });

}
//#endregion
//#region LIGHT FUNCTIONS

function createLight(id) {
    spotlights[id] = new SpotLight(game.getEntityCoords(game.playerPedId()).x, game.getEntityCoords(game.playerPedId()).y, game.getEntityCoords(game.playerPedId()).z);
}
function renderLights() {
    spotlights.forEach((light) => {
        game.drawSpotLight(light.position.x, light.position.y, light.position.z, light.direction.x, light.direction.y, light.direction.z, light.color.r, light.color.g, light.color.b, light.distance, light.brightness, light.hardness, light.radius, 1);
    });
}

//#endregion
//#region IPL FUNCTIONS
function loadIPL(ipl) {
    game.requestIpl(ipl);
}
function unloadIPL(ipl) {
    game.removeIpl(ipl);
}
//#endregion


function loadCharacterCustom() {

    let events = {};
    events['setHairColor'] = (colorID, highlightColorID) => { setHairColor(colorID, highlightColorID); };
    events['setHeadOverlay'] = (key, index, opacity) => {
        let arg1 = new Array(13).fill(null);
        let arg2 = new Array(13).fill(null);

        arg1[key] = index;
        arg2[key] = opacity;

        setHeadOverlay(arg1, arg2);
    };
    events['setComponent'] = (key, drawable, texture, palette) => {
        let arg1 = new Array(11).fill(null);
        let arg2 = new Array(11).fill(null);
        let arg3 = new Array(11).fill(null);

        arg1[key] = drawable;
        arg2[key] = texture;
        arg3[key] = palette;

        setComponentVariation(arg1, arg2, arg3);
    };
    events['setFaceFeature'] = (key, value) => {
        let arg = new Array(20).fill(null);
        arg[key] = value;

        game.setPedFaceFeature(game.playerPedId(), key, value);
    };
    events['requestHairColors'] = (id, container, size, callback) => { requestHairColors(cef.getView('charactercustom').view, id, container, size, callback); };
    events['camFocusBodypart'] = (bodypart, offset, fov, easeTime) => { focusOnBone(bodypart, offset, fov, easeTime); };
    events['setModel'] = (model) => { setModel(model); };

    cef.createView('charactercustom', 'charactercustom/charactercustom.html', true, true, events);

}
function loadContextView() {
    let events = {};
    events['chatmessage'] = (text) => { alt.emitServer('chatmessage', text); };

    cef.createView('context', 'context/context.html', false, true, events);

}
function loadSkinChangerView() {
    let events = {};
    events['chatmessage'] = (text) => { alt.emitServer('chatmessage', text); };
    events['skinchange'] = (text) => { alt.emitServer('chatmessage', "!vetements " + text); };

    cef.createView('skinchanger', 'skinchanger/skinchanger.html', true, true, events);
}
function loadAnimationsView() {
    let events = {};
    events['load'] = () => { Object.keys(animation.anims).forEach((anim) => { cef.getView('animationview').execJS(`add_buttonanim('${animation.anims[anim].label}', '${anim}')`); }) };
    events['playAnim'] = (anim) => { animation.playAnim(anim); };

    cef.createView('animationview', 'animations/animations.html', true, true, events);
}
loadAnimationsView();
loadCharacterCustom();
loadContextView();
loadAnimationsView();


let checkCefControls = alt.setInterval(() => {

    let changeControl = false;

    let i = 0;
    while (!changeControl && i < cef.cefs.length) {
        if (cef.cefs[i].isOpened()) {
            if (cef.cefs[i].freeze)
                changeControl = true;

        }
        i++;
    }

    if(chatopen)
    {
        alt.toggleGameControls(false);
    } else 
    {
        alt.toggleGameControls(!changeControl);
    }


}, 50);

alt.on('update', () => {

});

