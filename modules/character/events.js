import * as game from 'natives';
import * as alt from 'alt';

import * as character from 'modules/character/main';

alt.onServer('clearPedDamage', () => {
    game.clearPedBloodDamage();
});