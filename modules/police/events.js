import alt from 'alt';
import game from 'natives';
import * as police from "modules/police/main"
alt.onServer('setHandcuff', (value) => {
    if (value == undefined) {
        value = !police.handcuffed;
    }
    if (value == true) {
        police.putHandcuff();
    }
    else {
        police.removeHandcuff();
    }
});