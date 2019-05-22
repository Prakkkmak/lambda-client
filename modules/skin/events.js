import * as skin from "modules/skin/main"
import alt from 'alt';
// args are drawable, texture, palette
alt.onServer('setComponent', (args) => {
    alt.log(args);
    skin.setComponentVariations(args);
});