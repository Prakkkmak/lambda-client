import alt from 'alt';
import game from 'natives';

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

setHeadBlendData(0, 0, 0, 0, 0.5, 0.5);

export function saveSkin() {
    let a = [];
    currentComponentVariation.forEach((elem) => {
        a.push(elem.drawable);
        a.push(elem.texture);
        a.push(elem.palette);
    });
    currentPropIndex.forEach((elem) => {
        a.push(elem.drawable);
        a.push(elem.texture);
    });

    alt.log(currentHeadBlendData);
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

    alt.emitServer('setskin', a);
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
    alt.log("setComponentVariation : " + index + " " + drawable + " " + texture + " " + palette)
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
    alt.log("setPropVariation : " + index + " " + drawable + " " + texture);
    currentPropIndex[index].drawable = drawable;
    currentPropIndex[index].texture = texture;
    game.setPedPropIndex(game.playerPedId(), index, drawable, texture, true);
}
export function setHairColor(colorID, highlightColorID) {
    if (colorID < 0) colorID = 0;
    if (highlightColorID < 0) highlightColorID = 0
    currentHairColor = {
        color: colorID,
        taint: highlightColorID
    }
    alt.log("color " + currentHairColor);
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
    }
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
    alt.log("VALUE " + index)
    alt.log("VALUE " + opacity)
    game.setPedHeadOverlay(game.playerPedId(), i, index, opacity);
    var colortype = 0;
    if (i == 2 || i == 1 || i == 10) colortype = 1;
    if (i == 5 || i == 8) colortype = 2;
    game.setPedHeadOverlayColor(game.playerPedId(), i, colortype, firstcolor, secondcolor);
}

export function setFaceFeatures(args) {
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
    alt.log("VALUE " + index)
    alt.log("VALUE " + value)
    game.setPedFaceFeature(game.playerPedId(), index, value);
}


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