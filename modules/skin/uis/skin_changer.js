import * as skin from "modules/skin/main";
import alt from 'alt';
const MAX_COMPONENT = 11;
const MAX_SELECTED = MAX_COMPONENT;
const selected_strings = ["tete", "masque", "cheveux", "torse", "jambe", "sac", "pieds", "accessoire", "sous-haut", "armure", "détail", "haut"];


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
        selected = 0;
    }
}

export function nextSelected() {
    if (selected <= MAX_COMPONENT) {
        skin.setComponentVariation(selected,
            skin.currentComponentVariation[selected].drawable + 1,
            skin.currentComponentVariation[selected].texture,
            skin.currentComponentVariation[selected].palette);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[selected] +
            " : " +
            skin.currentComponentVariation[selected].drawable +
            "," +
            skin.currentComponentVariation[selected].texture +
            "," +
            skin.currentComponentVariation[selected].palette);
    }


}

export function previousSelected() {
    if (selected <= MAX_COMPONENT) {
        skin.setComponentVariation(selected,
            skin.currentComponentVariation[selected].drawable - 1,
            skin.currentComponentVariation[selected].texture,
            skin.currentComponentVariation[selected].palette);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[selected] +
            " : " +
            skin.currentComponentVariation[selected].drawable +
            "," +
            skin.currentComponentVariation[selected].texture +
            "," +
            skin.currentComponentVariation[selected].palette);
        // TODO emit la nouvelle valeur
    }
}

export function save() {
    skin.saveComponentVariations();
    alt.emit('chatmessage', 'skin manager', "Sauvegarde de skin.");
}