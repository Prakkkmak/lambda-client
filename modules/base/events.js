import alt from 'alt';
import * as base from "modules/base/main"

alt.onServer('setFreeze', (value) => {
    base.freezePlayer(value);
});