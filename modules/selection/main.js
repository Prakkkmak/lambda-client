import * as alt from 'alt';
import * as game from 'natives';
import * as position_utils from 'modules/utils/position'

let playerSelected = null;
let sphere = false;
export function enableDebugSphere() {
    sphere = !sphere;
}
export function updateClose() {
    let yaw = position_utils.getRotation();
    let frontPos = position_utils.positionInAngle(alt.Player.local.pos, -yaw, 0.7);
    if (sphere) {
        game.drawMarker(1, frontPos.x, frontPos.y, frontPos.z, 0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.1, 0, 0, 100, 50, 0, 1, 2, 0, 0, 0, 0);
        game.drawMarker(28, frontPos.x, frontPos.y, frontPos.z, 0, 0, 0, 0, 0, 0, 1.1, 1.1, 1.1, 0, 50, 100, 20, 0, 1, 2, 0, 0, 0, 0);
    }

    let closePlayer = position_utils.closePlayerInRange(frontPos, 1.1);
    //alt.log(JSON.stringify(closePlayer));
    if (closePlayer != null) {
        let pos = closePlayer.pos;
        game.drawMarker(0, pos.x, pos.y, pos.z + 1.1, 0, 0, 0, 0, 0, 0, 0.2, 0.2, 0.2, 241, 196, 15, 50, 1, 1, 2, 0, 0, 0, 0);
    }
    if (closePlayer != playerSelected) {
        playerSelected = closePlayer;
        if (playerSelected == null) alt.emitServer("changeSelectedPlayer", -1);
        else alt.emitServer("changeSelectedPlayer", playerSelected.id);
    }
}