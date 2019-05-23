import alt from 'alt';
import game from 'natives';
import * as cef from 'modules/cef/main';
import * as skin from 'modules/skin/main'

const rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

export function loadCharacterCustom() {

    let events = {};
    events['setHairColor'] = (colorID, highlightColorID) => { 
        skin.setHairColor(colorID, highlightColorID); 
    };
    events['setHeadOverlay'] = (key, index, opacity) => {
        let arg1 = new Array(13).fill(null);
        let arg2 = new Array(13).fill(null);

        arg1[key] = index;
        arg2[key] = opacity;

        setHeadOverlay(arg1, arg2);
    };
    events['setComponent'] = (key, drawable, texture, palette) => {
        
        skin.setComponentVariation(key, drawable, texture, palette);
    };
    events['setFaceFeature'] = (key, value) => {
        skin.setFaceFeature(key, value);
    };
    events['requestHairColors'] = (id, container, size, callback) => { 
        let colors = new Array(game.getNumHairColors());
        for (let i = 0; i < game.getNumHairColors(); i++) {
            let [_, r, g, b] = game.getHairColor(i, 0, 0, 0);
            colors[i] = "'#" + rgbToHex(r) + rgbToHex(g) + rgbToHex(b) + "'";
        }

        cef.getView('charactercustom').view.execJS(`add_colorpicker('${id}','${container}',${size},[${colors}], ${callback})`);
    };
    // events['camFocusBodypart'] = (bodypart, offset, fov, easeTime) => { 
    //     focusOnBone(bodypart, offset, fov, easeTime); 
    // };
    events['setModel'] = (model) => { 
        skin.setModel(model).then(() => {

            if(model.toLowerCase() == 'male')
            {
                skin.setHeadBlendData(0,21,0,15,0,0);
            } else if(model.toLowerCase() == 'female') {
                skin.setHeadBlendData(0,21,0,15,1,0);
            }
            game.setPedDefaultComponentVariation(game.playerPedId());

            alt.log('Model set');

        }); 
        
    }
    events['setEyeColor'] = (value) => {
        skin.setEyeColor(value);
    };
    events['close'] = (c) => {
        cef.getView(c).close();
    };
    cef.createView('charactercustom', 'character/uis/charactercustom/charactercustom.html', events,[cef.eCefFlags.SHOW_CURSOR, cef.eCefFlags.FREEZE_PLAYER]);

}

export function openCharacterCustom()
{
    cef.getView('charactercustom').open();
}


loadCharacterCustom();
