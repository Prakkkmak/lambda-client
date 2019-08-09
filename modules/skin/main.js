import * as alt from 'alt';
import * as game from 'natives';
import * as base from 'modules/base/main';
import * as cef from 'modules/cef/main';
import * as camera from 'modules/camera/main';

const rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

export let currentComponentVariation = [];
for (let i = 0; i < 12; i++) {
    currentComponentVariation[i] = {
        drawable: 0,
        texture: 0,
        palette: 0
    }
}
export let currentPropIndex = [];
for (let i = 0; i < 5; i++) {
    currentPropIndex[i] = {
        drawable: 0,
        texture: 0,
    }
}
export let currentFaceFeature = [];
for (let i = 0; i < 20; i++) {
    currentFaceFeature[i] = 0.0
}
export let currentHeadOverlay = [];
for (let i = 0; i < 13; i++) {
    currentHeadOverlay[i] = {
        index: 0,
        opacity: 1,
        firstcolor: 0,
        secondcolor: 0
    }
}

export let currentFaceFeatures = [];
for (let i = 0; i < 20; i++) {
    currentFaceFeatures[i] = 0;
}

export let currentHeadBlendData = {
    shapeMother: 0,
    shapeFather: 0,
    skinMother: 0,
    skinFather: 0,
    shapeMix: 0.5,
    skinMix: 0.5
}

export let currentHairColor = {
    color: 0,
    taint: 0
}

export let currentEyeColor = 0;

export function saveSkin() {
    let a = [];
    currentComponentVariation.forEach((elem) => {
        a.push(elem.drawable);
        a.push(elem.texture);
        a.push(elem.palette);
    });
    let c = []
    currentPropIndex.forEach((elem) => {
        c.push(elem.drawable);
        c.push(elem.texture);
    });
    alt.emitServer('setheaddata', currentHeadBlendData.shapeMother, currentHeadBlendData.shapeFather,
        currentHeadBlendData.skinMother, currentHeadBlendData.skinFather, currentHeadBlendData.shapeMix, currentHeadBlendData.skinMix);
    alt.emitServer('sethaircolor', currentHairColor.color, currentHairColor.taint);
    alt.emitServer('setfacefeatures', currentFaceFeature);
    let b = []
    currentHeadOverlay.forEach((elem) => {
        b.push(elem.index);
        b.push(elem.firstcolor);
        b.push(elem.secondcolor);
    })
    alt.emitServer('setheadoverlays', b);
    alt.emitServer("chatConsole", "component" + a);
    alt.emitServer('setskin', a);
    alt.emitServer('setprops', c);
    alt.emitServer('save');
}

export function setComponentVariations(args) { // Array of elements
    for (let i = 0; i < currentComponentVariation.length; i++) {
        currentComponentVariation[i].drawable = args[i * 3];
        currentComponentVariation[i].texture = args[i * 3 + 1];
        currentComponentVariation[i].palette = args[i * 3 + 2];
    }
    for (var i = 0; i < 12; i++) {
        setComponentVariation(i, currentComponentVariation[i].drawable, currentComponentVariation[i].texture, currentComponentVariation[i].palette);
    }
}
export function setComponentVariation(index, drawable, texture, palette) { // Array of elements
    if (drawable < 0) drawable = 0;
    if (texture < 0) texture = 0;
    if (palette < 0) palette = 0;
    currentComponentVariation[index].drawable = drawable;
    currentComponentVariation[index].texture = texture;
    currentComponentVariation[index].palette = palette;
    game.setPedComponentVariation(game.playerPedId(), index, drawable, texture, palette);
}

export function setProps(args) {
    for (let i = 0; i < currentPropIndex.length; i++) {
        currentPropIndex[i].drawable = args[i * 2];
        currentPropIndex[i].texture = args[i * 2 + 1];
    }
    for (var i = 0; i < currentPropIndex.length; i++) {
        setProp(i, currentPropIndex[i].drawable, currentPropIndex[i].texture);
    }
}
export function setProp(index, drawable, texture) {
    if (drawable < 0) drawable = 0;
    if (texture < 0) texture = 0;
    currentPropIndex[index].drawable = drawable;
    currentPropIndex[index].texture = texture;
    if (index == 3) index = 6;
    if (index == 4) index = 7;
    game.setPedPropIndex(game.playerPedId(), index, drawable, texture, true);
}

export function setHairColor(colorID, highlightColorID) {
    if (colorID < 0) colorID = 0;
    if (highlightColorID < 0) highlightColorID = 0
    currentHairColor = {
        color: colorID,
        taint: highlightColorID
    }
    //alt.log("color " + currentHairColor);
    game.setPedHairColor(game.playerPedId(), colorID, highlightColorID);
}

export function setEyeColor(colorID) {
    if (colorID < 0) colorID = 0;
    currentEyeColor = colorID;
    game.setPedEyeColor(game.playerPedId(), currentEyeColor);
}
export function setHeadBlendData(shapeMother, shapeFather, skinMother, skinFater, shapeMix, skinMix) {
    currentHeadBlendData = {
        shapeMother: shapeMother,
        shapeFather: shapeFather,
        skinMother: skinMother,
        skinFather: skinFater,
        shapeMix: shapeMix,
        skinMix: skinMix
    };
    game.setPedHeadBlendData(game.playerPedId(), shapeMother, shapeFather, 0, skinMother, skinFater, 0, shapeMix, skinMix, 0, false);
}

export function setHeadOverlays(args) {
    for (var i = 0; i < currentHeadOverlay.length; i++) {
        currentHeadOverlay[i].index = args[i * 3];
        currentHeadOverlay[i].firstcolor = args[i * 3 + 1];
        currentHeadOverlay[i].secondcolor = args[i * 3 + 2];
    }
    for (var i = 0; i < currentHeadOverlay.length; i++) {
        setHeadOverlay(i, currentHeadOverlay[i].index, currentHeadOverlay[i].opacity, currentHeadOverlay[i].firstcolor, currentHeadOverlay[i].secondcolor);
    }
}
export function setHeadOverlay(i, index, opacity, firstcolor, secondcolor) {
    if (index < 0) index = 0;
    if (opacity < 0) opacity = 0;
    if (firstcolor < 0) firstcolor = 0;
    if (secondcolor < 0) secondcolor = 0
    currentHeadOverlay[i].index = index;
    currentHeadOverlay[i].opacity = opacity;
    currentHeadOverlay[i].firstcolor = firstcolor;
    currentHeadOverlay[i].secondcolor = secondcolor;
    game.setPedHeadOverlay(game.playerPedId(), i, index, opacity);
    var colortype = 0;
    if (i == 2 || i == 1 || i == 10) colortype = 1;
    if (i == 5 || i == 8) colortype = 2;
    game.setPedHeadOverlayColor(game.playerPedId(), i, colortype, firstcolor, secondcolor);
}

export function setFaceFeatures(args) {
    //alt.log(args)
    for (let i = 0; i < currentFaceFeature.length; i++) {
        currentFaceFeature[i] = args[i];
    }
    for (let i = 0; i < currentFaceFeature.length; i++) {
        setFaceFeature(i, currentFaceFeature[i]);
    }
}
export function setFaceFeature(index, value) {
    if (value < -1) value = -1;
    if (value > 1) value = 1;
    currentFaceFeature[index] = value;
    game.setPedFaceFeature(game.playerPedId(), index, value);
}

export function setModel(model) {
    if (model.toLowerCase() == 'male') {
        model = game.getHashKey('mp_m_freemode_01')
    } else if (model.toLowerCase() == 'female') {
        model = game.getHashKey('mp_f_freemode_01')
    } else {
        model = game.getHashKey(model);
    }
    return new Promise((resolve, reject) => {
        base.loadModel(model).then(() => {
            game.setPlayerModel(game.playerId(), model);
            resolve(true);

        });
    });

}

export function loadCharacterCustom() {

    let events = {};
    events['setHairColor'] = (colorID, highlightColorID) => {
        setHairColor(Number(colorID), Number(highlightColorID));
    };
    events['setHeadOverlay'] = (key, index, opacity) => {
        let arg1 = new Array(13).fill(null);
        let arg2 = new Array(13).fill(null);

        arg1[Number(key)] = Number(index);
        arg2[Number(key)] = Number(opacity);

        setHeadOverlay(arg1, arg2);
    };
    events['setComponent'] = (key, drawable, texture, palette) => {

        setComponentVariation(Number(key), Number(drawable), Number(texture), Number(palette));
    };
    events['setFaceFeature'] = (key, value) => {
        setFaceFeature(Number(key), Number(value));
    };
    events['requestHairColors'] = (id, container, size, callback) => {
        let colors = new Array(game.getNumHairColors());
        for (let i = 0; i < game.getNumHairColors(); i++) {
            let [_, r, g, b] = game.getHairColor(i, 0, 0, 0);
            colors[i] = "'#" + rgbToHex(r) + rgbToHex(g) + rgbToHex(b) + "'";
        }

        cef.getView('charactercustom').view.execJS(`add_colorpicker('${id}','${container}',${size},[${colors}], ${callback})`);
    };
    events['camFocusBodypart'] = (bodypart, offset, fov, easeTime) => {
        camera.createCam('charactercustom').focusOnBone(bodypart, offset, fov, easeTime, game.playerPedId(), true);
    };
    events['setModel'] = (model) => {
        setModel(model).then(() => {

            if (model.toLowerCase() == 'male') {
                setHeadBlendData(0, 21, 0, 15, 0, 0);
            } else if (model.toLowerCase() == 'female') {
                setHeadBlendData(0, 21, 0, 15, 1, 0);
            }
            game.setPedDefaultComponentVariation(game.playerPedId());
        });

    }
    events['setEyeColor'] = (value) => {
        setEyeColor(Number(value));
    };
    events['close'] = (c) => {
        cef.getView(c).close();
        camera.goBackToGameplayCam();
    };

    cef.createView('charactercustom', 'skin/uis/charactercustom/charactercustom.html', events, [cef.eCefFlags.SHOW_CURSOR, cef.eCefFlags.FREEZE_PLAYER]);

}

export function openCharacterCustom() {
    cef.getView('charactercustom').open();
}

loadCharacterCustom();

/*
//TODO ==>




export function setFaceFeatures(args) {
    for (let i = 0; i < 40; i += 2) {
        game.setPedFaceFeature(game.playerPedId(), args[i], args[i + 1]);
    }
}

export function setFaceFeature(index, value) {
    game.setPedFaceFeature(game.playerPedId(), index, value);
}*/