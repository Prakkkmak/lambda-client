import alt from 'alt';
import game from 'natives';
import * as admin from 'modules/admin/main';

alt.onServer('godMode', (state) => {
    if(state)
    {
        admin.enableGodMode();
    } else {
        admin.disableGodMode();
    }
});

alt.onServer('invisibility', (state) => {
    if(state)
    {
        admin.enableInvisibility();
    } else {
        admin.disableInvisibility();
    }
});