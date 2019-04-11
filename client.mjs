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
    'IK_Head' : 0x322c
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
let contextView = null;
let skinchangerView = null;
let characterCustomView = null;
//#endregion

let webviewLayer = 0;

alt.onServer('setComponent', (argsDrawable, argsTexture, argsPalette) => 
{
    setComponentVariation(argsDrawable, argsTexture, argsPalette);
});
alt.onServer('setHeadOverlay', (argsIndex, argsOpacity) => 
{
    setHeadOverlay(argsIndex, argsOpacity);
});
alt.onServer('setProps', (argsDrawable, argsTexture) => 
{
    setProps(argsDrawable, argsTexture);
});
alt.onServer('setFreeze', (value) => {
    freezePlayer(value);
});

alt.onServer('giveAllWeapons', () => {
    giveAllWeapons();
});
//#endregion
var cam = null;

//#region event_general

alt.on('keydown', (key) => {
    //Touche de clavier enfoncée
    if(key == keys.E){
        openCharacterCustom();
        focusOnBone('IK_Head', {x:0, y:2, z:0});
    } else if(key == keys.A)
    {
        closeCharacterCustom();
        goBackToGameplayCam();
    }
    
});




/* Functions */
function giveAllWeapons() {
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
function setControlsEnabled(value)
{
    if(alt.gameControlsEnabled != value)
    {
        alt.toggleGameControls(value);
    }
}
function freezePlayer(value)
{
    game.freezeEntityPosition(value);
}
function setCursorVisible(value)
{
    alt.showCursor(value);
}

function setHeadOverlay(argsIndex, argsOpacity)
{
    for (var i = 0; i < 13; i++) 
    {
        game.setPedHeadOverlay(game.playerPedId(), i , argsIndex[i], argsOpacity[i]);
    }
}
function setProps(argsDrawable, argsTexture)
{
    for (var i = 0; i < 3; i++) 
    {
        game.setPedPropIndex(game.playerPedId(), prodComponentIds[i] , argsDrawable[i], argsTexture[i], true);
    }
}
function setComponentVariation(argsDrawable, argsTexture, argsPalette)
{
    for (var i = 0; i < 11; i++) 
    {
        game.setPedComponentVariation(game.playerPedId(), i + 1, argsDrawable[i], argsTexture[i], argsPalette[i]);
    }
}


//#region WEBVIEWS FUNCTIONS
/**
 * Permet de focus une WebView (cef)
 *
 * @param {WebView}   web           La WebView à focus.
 */
function setFocusOn(web)
{
    web.focus();
}
function isWebViewOpened(web)
{
    return web != null;
}
function destroyWebView(web)
{
    web.destroy();
}

function openCharacterCustom()
{
    if(!isWebViewOpened(characterCustomView))
    {
        characterCustomView = new alt.WebView("http://resources/lambda_client/client/html/charactercustom/charactercustom.html");

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
        
        webviewLayer++;
        setFocusOn(characterCustomView);
    }
}
function closeCharacterCustom()
{
    if(isWebViewOpened(characterCustomView)) 
    {
        destroyWebView(characterCustomView);
        characterCustomView = null;
        webviewLayer--;
    }
}

function openContextView()
{
    if(!isWebViewOpened(contextView)) 
    {
        contextView = new alt.WebView('http://resources/lambda_client/client/html/context/context.html')

        contextView.on('chatmessage', (text) => {
            //Evènement appelé un bouton de commande est cliqué
                alt.emitServer('chatmessage', text);
            });
        webviewLayer++;
    }
    //#region event_context
    //#endregion
}
function closeContextView()
{
    if(isWebViewOpened(contextView))    
    {
        destroyWebView(contextView);
        contextView = null;
        webviewLayer--;
    }

}

function openSkinChangerView()
{
    if(!isWebViewOpened(skinchangerView))
    {
        skinchangerView = new alt.WebView('http://resources/lambda_client/client/html/skinchanger/skinchanger.html');

        skinchangerView.on('chatmessage', (text) => {
            //Evènement appelé un bouton de commande est cliqué
            alt.emitServer('chatmessage', text);
        });
        skinchangerView.on('skinchange', (text) => {
            alt.emitServer('chatmessage', "!vetements "+text);
        });
        webviewLayer++;
    }
}
function closeSkinChangerView()
{
    if(isWebViewOpened(skinchangerView))    
    {
        destroyWebView(skinchangerView);
        skinchangerView = null;
        webviewLayer--;
    }

}
//#endregion
//#region CAM FUNCTIONS
function focusOnBone(bone, offset)
{
    alt.log(bone);
    bone = (typeof(bone) == 'string') ? ped_bones[bone] : bone;


    if(cam == null) 
    {
        alt.log(bone);
        alt.nextTick(() => {
            cam = game.createCam('DEFAULT_SCRIPTED_CAMERA', false);
            game.setCamActive(cam, true);
            game.renderScriptCams(true, true, 200, true, false);
            game.setCamFov(cam, 20);
            game.attachCamToPedBone(cam, game.playerPedId(), bone, offset.x, offset.y, offset.z, true);
            game.pointCamAtPedBone(cam, game.playerPedId(), bone, 0, 0, 0, true);
        });
    }

    alt.nextTick(() => {
    });
}
function goBackToGameplayCam()
{
    if(cam != null)
    {
        alt.nextTick(() => {

            game.setCamActive(cam, false);
            game.destroyAllCams(false);
            cam=null;
            game.renderScriptCams(false, false, 0, true, true);
        });
    }
}
//#endregion

let d = new Date();
let n = d.getTime();
let autorandom = false;
alt.on('update', () => {
    if(webviewLayer > 0)
    {
        setControlsEnabled(false);
    } else {
        setControlsEnabled(true);
    }

    if (autorandom) {
        d = new Date()
        if (d.getTime() - n > 3000) {
            n = d.getTime();
            alt.emitServer('chatmessage', "/vetement ale");
        }
    }
});



