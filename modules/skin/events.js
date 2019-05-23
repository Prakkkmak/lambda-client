import * as skin from "modules/skin/main"
import alt from 'alt';
// args are drawable, texture, palette
alt.onServer('setComponents', (args) => {
    alt.log(args);
    skin.setComponentVariations(args);
});

alt.onServer('setProps', (args) => {
    alt.log(args);
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

alt.onServer('setFaceFeatures', (args) => {
    skin.setFaceFeatures(args);
    alt.log("FEATURES = " + args);
});
alt.onServer('setHeadOverlays', (args) => {
    skin.setHeadOverlays(args);
    alt.log("OVERLAYS = " + args);
});