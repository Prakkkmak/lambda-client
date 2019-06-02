import alt from 'alt';
import game from 'natives';
import * as admin from 'modules/admin/main';

alt.onServer('invicibility', (state) => {
    if(state)
    {
        admin.enableInvicibility();
    } else {
        admin.disableInvicibility();
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

alt.onServer('spec', (playerName) => {
    
});