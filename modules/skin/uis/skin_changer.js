import * as skin from "modules/skin/main";
import alt from 'alt';
const MAX_COMPONENT = 11;
const MAX_PROP = 16;
const MAX_OVERLAY = 29
const MAX_FEATURE = 49;
const MAX_SELECTED = MAX_FEATURE;
const selected_strings = ["tete", "masque", "cheveux", "torse", "jambe", "sac", "pieds", "accessoire", "sous-haut", "armure", "détail", "haut",
    "chapeau", "lunettes", "oreille", "montre", "bracelet",
    "Tâches", "Pilosité", "Sourcils", "Age", "Makeup", "Blush", "Grain de peau", "Soleil", "Rouge à lèvre", "Tache de rousseurs", "Pilosité torse", "Tache du corps", "Ajout de taches du corps",
    "Nez largeur", "Nez longueur", "Nez taille", "Nez pont", "Nez tip", "Nez maj pont",
    "Sourcil hauteur", "Sourcil longueur",
    "Paumette hauteur", "Paumette longueur",
    "Joues",
    "Yeux", "Lèvres",
    "Machoire 1", "Machoire 2",
    "Menton taille", "Mento position", "Menton hauteur", "Menton forme",
    "Cou longueur"];


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
            selected_strings[selected] +
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
            selected_strings[selected] +
            " : " +
            skin.currentPropIndex[i].drawable +
            "," +
            skin.currentPropIndex[i].texture);
    }
    if (selected > MAX_PROP && selected <= MAX_OVERLAY) {
        i -= MAX_PROP + 1;
        skin.setHeadOverlay(i, skin.currentHeadOverlay[i].index += dec, 1, skin.currentHeadOverlay[i].firstcolor, skin.currentHeadOverlay[i].secondcolor);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[selected] +
            " : " +
            skin.currentHeadOverlay[i].index +
            "," +
            skin.currentHeadOverlay[i].firstcolor +
            "," +
            skin.currentHeadOverlay[i].secondcolor);
    }
    if (selected > MAX_OVERLAY && selected <= MAX_SELECTED) {
        i -= MAX_OVERLAY + 1;
        skin.setFaceFeature(i, Math.round(skin.currentFaceFeature[i] += dec) / 10);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[selected] +
            " : " +
            skin.currentFaceFeature[i]);
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
            selected_strings[selected] +
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
            selected_strings[selected] +
            " : " +
            skin.currentPropIndex[i].drawable +
            "," +
            skin.currentPropIndex[i].texture);
    }
    if (selected > MAX_PROP && selected <= MAX_OVERLAY) {
        i -= MAX_PROP + 1;
        skin.setHeadOverlay(i, skin.currentHeadOverlay[i].index, 1, skin.currentHeadOverlay[i].firstcolor += dec, skin.currentHeadOverlay[i].secondcolor);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[selected] +
            " : " +
            skin.currentHeadOverlay[i].index +
            "," +
            skin.currentHeadOverlay[i].firstcolor +
            "," +
            skin.currentHeadOverlay[i].secondcolor);
    }

}

export function nextSelectedPalette() {

    changeSelectedPalette(1);
}

export function previousSelectedPalette() {
    changeSelectedPalette(-1);
}

function changeSelectedPalette(dec) {
    let i = selected;
    if (dec > 0) dec = 1;
    if (dec < 0) dec = -1;
    if (dec == 0) return;
    if (selected <= MAX_COMPONENT) {
        skin.setComponentVariation(i,
            skin.currentComponentVariation[i].drawable,
            skin.currentComponentVariation[i].texture,
            skin.currentComponentVariation[i].palette += dec);
    }
    if (selected > MAX_PROP && selected <= MAX_OVERLAY) {
        i -= MAX_PROP + 1;
        skin.setHeadOverlay(i, skin.currentHeadOverlay[i].index, 1, skin.currentHeadOverlay[i].firstcolor, skin.currentHeadOverlay[i].secondcolor += dec);
        alt.emit('chatmessage', 'skin manager',
            selected_strings[selected] +
            " : " +
            skin.currentHeadOverlay[i].index +
            "," +
            skin.currentHeadOverlay[i].firstcolor +
            "," +
            skin.currentHeadOverlay[i].secondcolor);
    }

}

export function save() {
    skin.saveSkin();
    alt.emit('chatmessage', 'skin manager', "Sauvegarde de skin.");
}