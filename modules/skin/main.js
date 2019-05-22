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

export let currentHeadBlendData = {
    shapeMother: 0,
    shapeFather: 0,
    skinMother: 0,
    skinFather: 0,
    shapeMix: 0.5,
    skinMix: 0.5
}

setHeadBlendData(0, 0, 0, 0, 0.5, 0.5);

export function saveSkin() {
    let a = [];
    currentComponentVariation.forEach((elem) => {
        a.push(elem.drawable);
        a.push(elem.texture);
        a.push(elem.palette);
    });
    currentPropIndex.forEach((elem) => {
        alt.log(elem.drawable);
        a.push(elem.drawable);
        a.push(elem.texture);
    });
    alt.emitServer('setskin', a);
    alt.log(currentHeadBlendData);
    alt.emitServer('setheaddata', currentHeadBlendData.shapeMother, currentHeadBlendData.shapeFather,
        currentHeadBlendData.skinMother, currentHeadBlendData.skinFather, currentHeadBlendData.shapeMix, currentHeadBlendData.skinMix);
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
    alt.log("caca " + colorID + " " + highlightColorID);
    game.setPedHairColor(game.playerPedId(), colorID, highlightColorID);
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

/*
//TODO ==>

export function setHeadOverlays(args) {
    for (var i = 0; i < 13; i++) {
        setHeadOverlay(i, args[i], args[i]);
    }
}

export function setHeadOverlay(index, value, opacity) {
    game.setPedHeadOverlay(game.playerPedId(), index, value, opacity);
}



export function setFaceFeatures(args) {
    for (let i = 0; i < 40; i += 2) {
        game.setPedFaceFeature(game.playerPedId(), args[i], args[i + 1]);
    }
}

export function setFaceFeature(index, value) {
    game.setPedFaceFeature(game.playerPedId(), index, value);
}*/