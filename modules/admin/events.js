import * as alt from 'alt';
import * as game from 'natives';
import * as admin from 'modules/admin/main';

alt.onServer('setInvicibility', (state) => {
    if (state) {
        admin.enableInvicibility();
    } else {
        admin.disableInvicibility();
    }
});
alt.onServer('toggleInvicibility', () => {
    admin.toggleInvicibility();
});

alt.onServer('setInvisibility', (state) => {
    if (state) {
        admin.enableInvisibility();
    } else {
        admin.disableInvisibility();
    }
});
alt.onServer('toggleInvisibility', () => {
    admin.toggleInvisibility();
});


alt.onServer('setSpecTarget', (player, state) => {
    if (state) {
        admin.enableSpecMode(player.scriptID);
    } else {
        admin.disableSpecMode();
    }
});

alt.onServer('stopSpecTarget', () => {
    admin.disableSpecMode();
});


alt.on('consoleCommand', (command, ...args) => {

    if(command == 'freecam')
    {
        if(args[0] == 'start')
        {
            admin.enableFreeCam();
        } else if(args[0] == 'stop')
        {
            admin.disableFreeCam();
        }
    }
})