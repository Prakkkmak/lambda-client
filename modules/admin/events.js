import * as alt from 'alt';
import * as game from 'natives';
import * as admin from 'modules/admin/main';
import * as matrix from 'modules/utils/matrix';
import * as camera from 'modules/camera/main';
import * as graphics from 'modules/graphics/main';

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
        } else if(args[0] == "view")
        {
            let cells = new Array(4).fill(0).map(x => Array(1).fill(0));
            cells[0][0] = alt.Player.local.pos.x;
            cells[1][0] = alt.Player.local.pos.y;
            cells[2][0] = alt.Player.local.pos.z;
            cells[3][0] = 1;

            let playerMatrix = new matrix.Matrix(cells);

            let camview = camera.getCam('freecam').view_matrix.mul(playerMatrix);

            alt.log('X: ' + camview.cells[0][0]);
            alt.log('Y: ' + camview.cells[1][0]);
            alt.log('Z: ' + camview.cells[2][0]);
        } else if(args[0] == "proj")
        {
            let cells = new Array(4).fill(0).map(x => Array(1).fill(0));
            cells[0][0] = alt.Player.local.pos.x;
            cells[1][0] = alt.Player.local.pos.y;
            cells[2][0] = alt.Player.local.pos.z;
            cells[3][0] = 1;

            let playerMatrix = new matrix.Matrix(cells);
            let viewMatrix = camera.getCam('freecam').view_matrix.mul(playerMatrix);

            let projMatrix = camera.getCam('freecam').projection_matrix.mul(viewMatrix);

            let pixelCoord = {
                x: projMatrix.cells[0][0]/projMatrix.cells[3][0],
                y: projMatrix.cells[1][0]/projMatrix.cells[3][0]
                }
            alt.log('X screen: ' + pixelCoord.x);
            alt.log('Y screen: ' + pixelCoord.y);
        } else if(args[0] == "fov") {
            game.setCamFov(camera.getCam('freecam').cam, Number(args[1]));
        }

    }
})