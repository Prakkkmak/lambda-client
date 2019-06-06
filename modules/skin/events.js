import * as skin from "modules/skin/main"
import * as alt from 'alt';
// args are drawable, texture, palette
alt.onServer('setComponent', (index, drawable, texture, palette) => {
    skin.setComponentVariation(index, drawable, texture, palette);
});
alt.onServer('setComponents', (args) => {
    skin.setComponentVariations(args);
});

alt.onServer('setProp', (index, drawable, texture) => {
    skin.setProp(index, drawable, texture);
});
alt.onServer('setProps', (args) => {

    skin.setProps(args);
});

alt.onServer('setHeadData', (args) => {
    skin.setHeadBlendData(args[0], args[1], args[2], args[3], args[4], args[5]);
});

alt.onServer('setHairColor', (color, color2) => {
    skin.setHairColor(color, color2);
});
alt.onServer('setEyeColor', (color) => {
    skin.setEyeColor(color);
});

alt.onServer('setShape', (mother, father, mix) => {
    skin.setHeadBlendData(mother, father, skin.currentHeadBlendData.skinMother, skin.currentHeadBlendData.skinFater, mix, skin.currentHeadBlendData.skinMix);
});
alt.onServer('setSkin', (mother, father, mix) => {
    skin.setHeadBlendData(skin.currentHeadBlendData.shapeMother, skin.currentHeadBlendData.shapeFather, mother, father, skin.currentHeadBlendData.shapeMix, mix)
});

alt.onServer('setFaceFeature', (index, value) => {
    alt.log("FACE " + index + " + " + value);
    skin.setFaceFeature(index, value);
});

alt.onServer('setFaceFeatures', (args) => {
    skin.setFaceFeatures(args);
});
alt.onServer('setHeadOverlays', (args) => {
    skin.setHeadOverlays(args);
});

alt.onServer('setHeadOverlay', (i, index, opacity, firstcolor, secondcolor) => {
    skin.setHeadOverlay(i, index, opacity, firstcolor, secondcolor);
});