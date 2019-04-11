import alt from 'alt';
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
    'L' : 76,
    'K' : 75,
    'U' : 85,
    'E' : 69,
    'A' : 65,
    'Numpad_0' : 96,
    'Numpad_1' : 97,
    'Numpad_2' : 98,
    'Numpad_3' : 99,
    'Numpad_4' : 100,
    'Numpad_5' : 101,
    'Numpad_6' : 102,
    'Numpad_7' : 103,
    'Numpad_8' : 104,
    'Numpad_9' : 105
};

const ped_bones = 
{
    'SKELL_ROOT' : 0x0,
    'IK_Head ' : 0x322C
}

const cam_positions = {
    ped_bones : {
        'FACIAL_skull' : {
            x : 0,
            y : 2,
            z : 0
        }
    }
};

const rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };
/* Init */
game.setPedDefaultComponentVariation(game.playerPedId(), true);
game.setPedHeadBlendData(game.playerPedId(), 0, 1, 2, 0, 1, 2, 0.0, 0.0, 0.0, false);

//#region webviews
// let contextView = new alt.WebView("http://resources/lambda_client/client/html/context/context.html");
// let skinchangerView = new alt.WebView("http://resources/lambda_client/client/html/skinchanger/skinchanger.html");
let characterCustomView = new alt.WebView("http://resources/lambda_client/client/html/charactercustom/charactercustom.html");
// //#endregion

let playerFreezed = false;

// //#region event_context
// contextView.on('chatmessage', (text) => {
//     //Evènement appelé un bouton de commande est cliqué
//     alt.emitServer('chatmessage', text);
// });
// //#endregion
// //#region event_skin
// skinchangerView.on('chatmessage', (text) => {
//     //Evènement appelé un bouton de commande est cliqué
//     alt.emitServer('chatmessage', text);
// });
// skinchangerView.on('skinchange', (text) => {
//     alt.emitServer('chatmessage', "!vetements "+text);
// });
alt.onServer('setSkin', (args) => 
{
    alt.log(args);
    for (var i = 0; i < 11; i++) 
    {
        game.setPedComponentVariation(game.playerPedId(), i + 1, args[i], 0, 0);
    }
});
alt.onServer('setHeadOverlay', (args) => 
{
    alt.log(args);
    for (var i = 0; i < 13; i++) 
    {
        game.setPedHeadOverlay(game.playerPedId(), i , args[i], 1);
    }
});
alt.onServer('setProps', (argsDrawable, argsTexture) => 
{
    alt.log(args);

    for (var i = 0; i < 3; i++) 
    {
        game.setPedPropIndex(game.playerPedId(), prodComponentIds[i] , argsDrawable[i], argsTexture[i], true);
    }
});

// //#endregion
//#region charactercustom
characterCustomView.on('setHairColor', (colorID,highlightColorID) => {
    game.setPedHairColor(game.playerPedId(), colorID, highlightColorID);
});
characterCustomView.on('setHeadOverlay', (key, value) => {
    game.setPedHeadOverlay(game.playerPedId(), key , value, 1);
});
characterCustomView.on('setSkin', (key, value) => {
    game.setPedComponentVariation(game.playerPedId(), key, value, 0, 0);
});
characterCustomView.on('setFaceFeature', (key, value) => {
    game.setPedFaceFeature(game.playerPedId(), key, value);
});

characterCustomView.on('requestHairColors', (id, container,size,callback) => {
    let colors = [];
    for(let i=0;i<game.getNumHairColors();i++)
    {
        let [_, r, g, b] = game.getHairColor(i, 0, 0, 0);
        colors[i] = "'#" + rgbToHex(r) + rgbToHex(g) + rgbToHex(b) + "'";
        
    }
    characterCustomView.execJS(`add_colorpicker('${id}','${container}',${size},[${colors}], ${callback})`);

});
//#endregion
var cam = null;

//#region event_general

let pedhaircolor = -1;
let skinenabled = false;
alt.on('keydown', (key) => {
    //Touche de clavier enfoncée
    if(key == keys.E){
        focusOnBone(ped_bones["IK_Head"]);
    } else if(key == keys.A)
    {
        setFreeze(false);
        alt.nextTick(() => {
            game.setCamActive(cam, false);
            game.destroyAllCams(false);
            cam=null;
            game.renderScriptCams(false, false, 0, true, true);
        });
        

    }
    if (skinenabled) {
        if (key == keys.Numpad_6) {
            alt.emitServer('chatmessage', "/vetement suivant " + selected);
        }
        if (key == keys.Numpad_4) {
            alt.emitServer('chatmessage', "/vetement precedent " + selected);
        }
        if (key == keys.Numpad_8) {
            if (selected < 11) {
                selected++;
            }
            else {
                selected = 1;
            }
            alt.emitServer('chatmessage', "Slot selectioné: " + selected);
        }
        if (key == keys.Numpad_2) {
            if (selected > 1) {
                selected--;
            }
            else {
                selected = 11;
            }
            alt.emitServer('chatmessage', "Slot selectioné: " + selected);
        }
        if (key == keys.Numpad_3) {
            alt.emitServer('chatmessage', "/vetement valider");
        }
        if (key == keys.Numpad_1) {
            alt.emitServer('chatmessage', "/vetement mauvais");
        }
        if (key == keys.Numpad_5) {
            alt.emitServer('chatmessage', "/vetement tester");
        }
        if (key == keys.Numpad_9) {
            alt.emitServer('chatmessage', "/vetement gen");
        }

    }
});
alt.onServer('setFreeze', (value) => {
    setFreeze(value);
});

//#endregion

alt.onServer('giveAllWeapons', () => {
    giveWeapons();
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
function setFreeze(value)
{
    if(alt.gameControlsEnabled != value)
    {
        alt.toggleGameControls(!value);
    }
}
function setCursorVisible(value)
{
    alt.showCursor(value);
}
/**
 * Permet de focus une WebView (cef)
 *
 * @param {WebView}   web           La WebView à focus.
 */
function setFocusOn(web)
{
    web.focus(web);
}


function focusOnBone(bone)
{
    setFreeze(true);

    if(cam != null) 
    {
        game.setCamActive(cam, true);
        game.renderScriptCams(true, true, 200, true, false);
        game.setCamFov(cam, 20);
        game.attachCamToPedBone(cam, game.playerPedId(), bone, 0, 2, 0, true);
        game.pointCamAtPedBone(cam, game.playerPedId(), bone, 0, 0, 0, true);
} else {
        let bone = 0x322c;
        let position = game.getPedBoneCoords(game.playerPedId(), bone);

        alt.log(bone);
        alt.nextTick(() => {
            cam = game.createCam('DEFAULT_SCRIPTED_CAMERA', false);
            
            game.setCamFov(cam, 20);
            game.setCamActive(cam, true);
            game.renderScriptCams(true, true, 200, true, false);
            game.attachCamToPedBone(cam, game.playerPedId(), bone, 0, 2, 0, true);
            game.pointCamAtPedBone(cam, game.playerPedId(), bone, 0, 0, 0, true);
        });
    }
}

let d = new Date();
let n = d.getTime();
let autorandom = false;
alt.on('update', () => {
    if (autorandom) {
        d = new Date()
        if (d.getTime() - n > 3000) {
            n = d.getTime();
            alt.emitServer('chatmessage', "/vetement ale");
        }
    }
});

setFocusOn(characterCustomView);
setCursorVisible(true);
