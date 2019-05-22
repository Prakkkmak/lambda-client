import alt from 'alt';
import * as base from "modules/base/main"
import * as skin from "modules/skin/main"

alt.onServer('setFreeze', (value) => {
    base.freezePlayer(value);
});

alt.onServer('playerLoaded', () => {
    skin.setHeadBlendData(0, 0, 0, 0, 0.5, 0.5);
});