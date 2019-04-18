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
    'IK_Head' : 0x322c,
    'SKEL_Head ' : 0x796E,
    'FACIAL_facialRoot' : 0xFE2C, 
    'SKEL_Spine2' : 0x60f1,
    'SKEL_Root': 0x0
};

//#region webviews
let contextView = null;
let skinchangerView = null;
let characterCustomView = null;
//#endregion
let cursorVisible = false;

class SpotLight
{

    constructor(_x,_y,_z) 
    {
        this.position = 
        {
            x:_x,
            y:_y,
            z:_z
        };
        this.direction = 
        {
            x:0,
            y:0,
            z:0
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

/* Init */
setModel("Male");
goBackToGameplayCam();


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
alt.onServer('loadipl', (ipl) => {
    loadIPL(ipl);
});
alt.onServer('unloadipl', (ipl) => {
    unloadIPL(ipl);
});
//#endregion
var cam = null;
let skinenabled = false;
//#region event_general
alt.on('keydown', (key) => {
    //Touche de clavier enfoncée
    if(key == keys.E){
        openCharacterCustom();

    } else if(key == keys.A)
    {
        closeCharacterCustom();
    }

    if(skinenabled)
    {
        vetementChanger(key);
    } else if(key == 222)
    {
        skinenabled = !skinenabled;
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
    if(cursorVisible != value)
    {
        alt.showCursor(value);
        cursorVisible = value;
    }
}

function setModel(model)
{
    if(model.toLowerCase() == "male")
    {
        model = game.getHashKey("mp_m_freemode_01");
    } else if(model.toLowerCase() == "female") {
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
function setHairColor(colorID, highlightColorID)
{
    alt.log("setHairColor" + colorID);
    game.setPedHairColor(game.playerPedId(), colorID, highlightColorID);
}
function setHeadOverlay(argsIndex, argsOpacity)
{
    for (var i = 0; i < 13; i++) 
    {
        if (argsIndex[i] != null && argsOpacity[i] != null)
        {
            game.setPedHeadOverlay(game.playerPedId(), i , argsIndex[i], argsOpacity[i]);
        }
    }
}
function setHeadOverlayColor(argsColor)
{
    for(let i=0;i<13;i++)
    {
        if (argsColor[i] != null)
        {
            if(i == 1 || i == 10 || i == 2)
            {
                game.setPedHeadOverlayColor(game.playerPedId(), i, 1, argsColor[i], argsColor[i]);
            } else if(i == 5 || i == 8) 
            {
                game.setPedHeadOverlayColor(game.playerPedId(), i, 2, argsColor[i], argsColor[i]);
            } else {
                game.setPedHeadOverlayColor(game.playerPedId(), i, 0, argsColor[i], argsColor[i]);
            }
        }
    }
}
function setProps(argsDrawable, argsTexture)
{
    for (var i = 0; i < 3; i++) 
    {
        if (argsDrawable[i] != null && argsTexture[i] != null)
        {
            game.setPedPropIndex(game.playerPedId(), prodComponentIds[i] , argsDrawable[i], argsTexture[i], true);
        }
    }
}
function setComponentVariation(argsDrawable, argsTexture, argsPalette)
{
    for (var i = 0; i < 12; i++) 
    {
        if (argsDrawable[i] != null && argsTexture[i] != null && argsPalette[i] != null)
        {
            game.setPedComponentVariation(game.playerPedId(), i, argsDrawable[i], argsTexture[i], argsPalette[i]);
        }
    }
}
function setFaceFeature(argsIndex, argsScale)
{
    for(let i=0;i<20;i++)
    {
        game.setPedFaceFeature(game.playerPedId(), key, value);
    }
}
function requestHairColors(web, id, container, size, callback)
{
    let colors = new Array(game.getNumHairColors());
    for(let i=0;i<game.getNumHairColors();i++)
    {
        let [_, r, g, b] = game.getHairColor(i, 0, 0, 0);
        colors[i] = "'#" + rgbToHex(r) + rgbToHex(g) + rgbToHex(b) + "'";
        
    }
    web.execJS(`add_colorpicker('${id}','${container}',${size},[${colors}], ${callback})`);
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
    alt.log(webviewLayer);
    alt.log(cursorVisible);

    if(!isWebViewOpened(characterCustomView))
    {
        characterCustomView = new alt.WebView("http://resources/lambda_client/client/html/charactercustom/charactercustom.html");

        characterCustomView.on('setHairColor', (colorID,highlightColorID) => {
            
            setHairColor(colorID, highlightColorID);
        });
        characterCustomView.on('setHeadOverlay', (key, index, opacity) => {
            let arg1 = new Array(13).fill(null);
            let arg2 = new Array(13).fill(null);

            arg1[key] = index;
            arg2[key] = opacity;

            setHeadOverlay(arg1, arg2);
        });
        characterCustomView.on('setComponent', (key, drawable, texture, palette) => {
            let arg1 = new Array(11).fill(null);
            let arg2 = new Array(11).fill(null);
            let arg3 = new Array(11).fill(null);



            arg1[key] = drawable;
            arg2[key] = texture;
            arg3[key] = palette;

            alt.log(arg1);
            alt.log(arg2);
            alt.log(arg3);

            setComponentVariation(arg1,arg2,arg3);
        });
        characterCustomView.on('setFaceFeature', (key, value) => {
            let arg = new Array(20).fill(null);
            arg[key] = value;

            game.setPedFaceFeature(game.playerPedId(), key, value);
        });
        characterCustomView.on('requestHairColors', (id, container,size,callback) => {
            requestHairColors(characterCustomView, id, container, size, callback);
        });
        characterCustomView.on('camFocusBodypart', (bodypart, offset, fov, easeTime) => {
            focusOnBone(bodypart,offset, fov, easeTime);
        });
        characterCustomView.on('setModel', (model) => {
            setModel(model);
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
        goBackToGameplayCam();
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
//#region KEY CONTROLS
function vetementChanger(key)
{
    if (key == 102) {
        alt.emitServer('chatmessage', "/vetement suivant " + selected);
    }
    if (key == 100) {
        alt.emitServer('chatmessage', "/vetement precedent " + selected);
    }
    if (key == 104) {
        if (selected < 11) {
            selected++;
        }
        else {
            selected = 1;
        }
        alt.emitServer('chatmessage', "Slot selectioné: " + selected);
    }
    if (key == 98) {
        if (selected > 1) {
            selected--;
        }
        else {
            selected = 11;
        }
        alt.emitServer('chatmessage', "Slot selectioné: " + selected);
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
function createCam(position, rotation, fov)
{
    alt.nextTick(() => {
        cam = game.createCam('DEFAULT_SCRIPTED_CAMERA', false);
        game.setCamCoord(cam, position.x, position.y, position.z);
        game.setCamRot(cam, rotation.x, rotation.y, rotation.z);
        game.setCamActive(cam, false);
        game.setCamFov(cam, fov);
    });

    return cam;
}
function focusOnBone(bone, offset, fov, easeTime)
{
    bone = (typeof(bone) == 'string') ? ped_bones[bone] : bone;
    if(cam == null) 
    {
        createCam({x: 0, y:0, z:0}, {x: 0, y:0, z:0}, fov);
        alt.nextTick(() => {
            game.attachCamToPedBone(cam, game.playerPedId(), bone, offset.x, offset.y, offset.z, true);
            game.pointCamAtPedBone(cam, game.playerPedId(), bone, 0, 0, 0, true);        
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
//#region LIGHT FUNCTIONS
function createLight(id)
{
    spotlights[id] = new SpotLight(game.getEntityCoords(game.playerPedId()).x, game.getEntityCoords(game.playerPedId()).y, game.getEntityCoords(game.playerPedId()).z);
}
function renderLights()
{
    spotlights.forEach((light) => {
        game.drawSpotLight(light.position.x, light.position.y, light.position.z, light.direction.x, light.direction.y, light.direction.z, light.color.r, light.color.g, light.color.b, light.distance, light.brightness, light.hardness, light.radius, 1);
    });
}
//#endregion

//#region IPL FUNCTION
function loadIPL(ipl)
{
    game.RequestIpl(ipl);
}
function unloadIPL(ipl)
{
    game.removeIpl(ipl);
}
//#endregion
let d = new Date();
let n = d.getTime();

let autorandom = false;
alt.on('update', () => {
    if(webviewLayer > 0)
    {
        setControlsEnabled(false);
        setCursorVisible(true);
    } else {
        setControlsEnabled(true);
        setCursorVisible(false);
    }

    if (autorandom) {
        d = new Date()
        if (d.getTime() - n > 3000) {
            n = d.getTime();
            alt.emitServer('chatmessage', "/vetement ale");
        }
    }

    renderLights();
});

