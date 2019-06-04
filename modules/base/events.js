import alt from 'alt';
import * as base from "modules/base/main"
import * as skin from "modules/skin/main"
import * as cef from 'modules/cef/main';

alt.onServer('setFreeze', (value) => {
    base.freeze(value);
});

alt.onServer('playerLoaded', () => {
    skin.setHeadBlendData(0, 0, 0, 0, 0.5, 0.5);
});

alt.onServer('setContextActions', (json) => {
    cef.getView('context').view.emit('onParse', json);
});
