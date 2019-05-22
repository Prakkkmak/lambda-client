import game from 'natives';
import * as cef from 'modules/cef/main';

export function loadCharacterCustom() {

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
        setFaceFeature(arg);
    };
    events['requestHairColors'] = (id, container, size, callback) => { requestHairColors(cef.getView('charactercustom').view, id, container, size, callback); };
    events['camFocusBodypart'] = (bodypart, offset, fov, easeTime) => { focusOnBone(bodypart, offset, fov, easeTime); };
    events['setModel'] = (model) => { 
        setModel(model); 
        if(model.toLowerCase() == 'male')
        {
            setPedHeadBlendData(0,21,0,15,0,0);
        } else if(model.toLowerCase() == 'female') {
            setPedHeadBlendData(0,21,0,15,1,0);
        }
    }
    events['setEyeColor'] = (value) => {
        setEyeColor(value);
    };
    events['close'] = (c) => {
        cef.getView(c).close();
        goBackToGameplayCam();
    };
    cef.createView('charactercustom', 'character/uis/charactercustom/charactercustom.html', events,[cef.eCefFlags.SHOW_CURSOR, cef.eCefFlags.FREEZE_PLAYER]);

}

export function openCharacterCustom()
{
    cef.getView('charactercustom').open();
}


character.loadCharacterCustom();
