import game from 'natives';
import alt from 'alt';

import * as character from 'modules/character/main';

alt.onServer('clearPedDamage', ()=> {
    game.clearPedBloodDamage();
});