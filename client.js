import alt from 'alt';
import game from 'natives';

/* Vars */
const weapons = [
    "WEAPON_KNIFE", "WEAPON_BAT", "WEAPON_BOTTLE", "WEAPON_WRENCH",
    "WEAPON_PISTOL", "WEAPON_HEAVYPISTOL", "WEAPON_REVOLVER",
    "WEAPON_MICROSMG", "WEAPON_SMG", "WEAPON_COMBATPDW",
    "WEAPON_ASSAULTRIFLE", "WEAPON_CARBINERIFLE",
    "WEAPON_PUMPSHOTGUN"
];


/* Init */
game.setPedDefaultComponentVariation(game.playerPedId(), true);
giveWeapons();

/* Functions */
function giveWeapons() {
    let ped = game.playerPedId()

    for (const weapon of weapons) {
        game.giveWeaponToPed(ped, game.getHashKey(weapon), 9999, false, false)
    }
}

/* Events */
alt.onServer('giveAllWeapons', () => {
    giveWeapons();
});

alt.onServer('setSkin', (args) => {
    alt.log(args);
    for (var i = 0; i < 11; i++) {
        game.setPedComponentVariation(game.playerPedId(), i + 1, args[i], 0, 0)
    }
})

var selected = 1;
var skinenabled = true;
var autorandom = false;
alt.on('keydown', (key) => {
    if (skinenabled) {
        if (key == 102) {
            alt.emitServer('chatmessage', "/vetement suivant " + selected);
        }
        if (key == 100) {
            alt.emitServer('chatmessage', "/vetement precedent " + selected);
        }
        if (key == 104) {
            if (selected < 11) {
                selected++;
            }
            else {
                selected = 1;
            }
            alt.emitServer('chatmessage', "Slot selectioné: " + selected);
        }
        if (key == 98) {
            if (selected > 1) {
                selected--;
            }
            else {
                selected = 11;
            }
            alt.emitServer('chatmessage', "Slot selectioné: " + selected);
        }
        if (key == 99) {
            alt.emitServer('chatmessage', "/vetement valider");
        }
        if (key == 97) {
            alt.emitServer('chatmessage', "/vetement mauvais");
        }
        if (key == 101) {
            alt.emitServer('chatmessage', "/vetement tester");
        }
        if (key == 105) {
            alt.emitServer('chatmessage', "/vetement gen");
        }

    }


});


alt.on('keydown', (key) => {
    if (key == 96) {
        if (skinenabled) {
            skinenabled = false;
            alt.emitServer('chatmessage', "Vous avez arreté la selection de skins: " + selected);
        }
        else {
            skinenabled = true;
            alt.emitServer('chatmessage', "Vous avez démarré la selection de skins: " + selected);
        }

    }
    if (key == 103) {
        if (autorandom) autorandom = false;
        else autorandom = true;
    }

});
var d = new Date();
var n = d.getTime();
alt.on('update', () => {
    if (autorandom) {
        d = new Date()
        if (d.getTime() - n > 3000) {
            n = d.getTime();
            alt.emitServer('chatmessage', "/vetement ale");
        }
    }

})