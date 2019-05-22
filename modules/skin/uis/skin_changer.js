import * as skin from "modules/skin/main";
import alt from 'alt';
const MAX_COMPONENT = 11;
const MAX_PROP = 16;
const MAX_SELECTED = MAX_PROP;
const selected_strings = ["tete", "masque", "cheveux", "torse", "jambe", "sac", "pieds", "accessoire", "sous-haut", "armure", "détail", "haut", "chapeau", "lunettes", "oreille", "montre", "bracelet"];


let selected = 0;

export function selectNext() {
    selected++;
    clampSelected();
    alt.log(selected_strings[selected] + " séléctioné");
    alt.emit('chatmessage', 'skin manager', "Selection de " + selected_strings[selected]);
    // TODO emit le slot selectioné
}

export function selectPrevious() {
    selected--;
    clampSelected();
    alt.log(selected_strings[selected] + " séléctioné")
    alt.emit('chatmessage', 'skin manager', "Selection de " + selected_strings[selected]);
    // TODO emit le slot selectioné
}

function clampSelected() {
    if (selected < 0) {
        selected = 0;
    }
    if (selected > MAX_SELECTED) {
        selected = MAX_SELECTED;
    }
}

export function nextSelected() {

    changeSelected(1);
}

export function previousSelected() {
    changeSelected(-1);
}

function changeSelected(dec) {
    let i = selected;
    if (dec > 0) dec = 1;
    if (dec < 0) dec = -1;
    if (dec == 0) return;
    if (selected <= MAX_COMPONENT) {
        skin.setComponentVariation(i,
            skin.currentComponentVariation[i].drawable += dec,
            skin.currentComponentVariation[i].texture,
            skin.currentComponentVariation[i].palette);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[i] +
            " : " +
            skin.currentComponentVariation[i].drawable +
            "," +
            skin.currentComponentVariation[i].texture +
            "," +
            skin.currentComponentVariation[i].palette);
    }
    if (selected > MAX_COMPONENT && selected <= MAX_PROP) {
        i -= MAX_COMPONENT + 1;
        skin.setProp(i,
            skin.currentPropIndex[i].drawable += dec,
            skin.currentPropIndex[i].texture);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[i] +
            " : " +
            skin.currentPropIndex[i].drawable +
            "," +
            skin.currentPropIndex[i].texture);
    }

}

export function nextSelectedTexture() {

    changeSelectedTexture(1);
}

export function previousSelectedTexture() {
    changeSelectedTexture(-1);
}

function changeSelectedTexture(dec) {
    let i = selected;
    if (dec > 0) dec = 1;
    if (dec < 0) dec = -1;
    if (dec == 0) return;
    if (selected <= MAX_COMPONENT) {
        skin.setComponentVariation(i,
            skin.currentComponentVariation[i].drawable,
            skin.currentComponentVariation[i].texture += dec,
            skin.currentComponentVariation[i].palette);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[i] +
            " : " +
            skin.currentComponentVariation[i].drawable +
            "," +
            skin.currentComponentVariation[i].texture +
            "," +
            skin.currentComponentVariation[i].palette);
    }
    if (selected > MAX_COMPONENT && selected <= MAX_PROP) {
        i -= MAX_COMPONENT + 1;
        skin.setProp(i,
            skin.currentPropIndex[i].drawable,
            skin.currentPropIndex[i].texture += dec);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[i] +
            " : " +
            skin.currentPropIndex[i].drawable +
            "," +
            skin.currentPropIndex[i].texture);
    }

}

export function save() {
    skin.saveSkin();
    alt.emit('chatmessage', 'skin manager', "Sauvegarde de skin.");
}