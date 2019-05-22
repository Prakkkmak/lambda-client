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

export function setComponentVariations(args) { // Array of elements
    for (let i = 0; i < currentComponentVariation.length; i++) {
        alt.log(args[i * 3]);
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

export function saveComponentVariations() {
    let a = [];
    currentComponentVariation.forEach((elem) => {
        a.push(elem.drawable);
        a.push(elem.texture);
        a.push(elem.palette);
    });
    alt.emitServer('setskin', a)
}
/*
export function setComponentVariation(index) { // Array of elements
    drawable = currentComponentVariation[index].drawable;
    texture = currentComponentVariation[index].texture;
    palette = currentComponentVariation[index].palette;
    game.setPedComponentVariation(game.playerPedId(), index, drawable, texture, palette);
}
//TODO ==>

export function setHeadOverlays(args) {
    for (var i = 0; i < 13; i++) {
        setHeadOverlay(i, args[i], args[i]);
    }
}

export function setHeadOverlay(index, value, opacity) {
    game.setPedHeadOverlay(game.playerPedId(), index, value, opacity);
}

export function setHairColor(colorID, highlightColorID) {
    game.setPedHairColor(game.playerPedId(), colorID, highlightColorID);
}

export function setProps(args) {
    for (var i = 0; i < 9; i += 3) {
        setProp(game.playerPedId(), args[i], args[i + 1], args[i + 2], true);
    }
}

export function setProp(index, drawable, texture) {
    game.setPedPropIndex(game.playerPedId(), index, drawable, texture, true);
}

export function setFaceFeatures(args) {
    for (let i = 0; i < 40; i += 2) {
        game.setPedFaceFeature(game.playerPedId(), args[i], args[i + 1]);
    }
}

export function setFaceFeature(index, value) {
    game.setPedFaceFeature(game.playerPedId(), index, value);
}*/