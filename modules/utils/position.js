import * as alt from 'alt';
import * as game from 'natives';

export function positionInAngle(pos, angle, dist) {
    let x = pos.x;
    let y = pos.y;
    let z = pos.z;
    x += dist * Math.sin(angle);
    y += dist * Math.cos(angle);
    return {
        x: x,
        y: y,
        z: z,
    }
}

export function closePlayer(pos) {
    let currentClosePlayer = null;
    alt.Player.all.forEach(target => {
        if (target != alt.getLocalPlayer()) {
            if (currentClosePlayer == null) currentClosePlayer = target;
            if (distance(target.pos, pos) < distance(currentClosePlayer.pos, pos)) currentClosePlayer = target;
        }
    });
    return currentClosePlayer;
}
export function closePlayerInRange(pos, range) {
    let currentClosePlayer = null;
    let i = 0;
    alt.Player.all.forEach(target => {
        if (target != alt.getLocalPlayer()) {
            if (distance(target.pos, pos) < range) {
                if (currentClosePlayer == null) currentClosePlayer = target;
                if (distance(target.pos, pos) < distance(currentClosePlayer.pos, pos)) currentClosePlayer = target;
            }
        }
    });
    return currentClosePlayer;
}

export function distance(pos1, pos2) {
    let x = pos1.x - pos2.x;
    let y = pos1.y - pos2.y;
    let z = pos1.z - pos2.z;
    return Math.sqrt(x * x + y * y + z * z);
}

export function getRotation() {
    let vector3Rotation = game.getEntityRotation(game.playerPedId(), 2);
    let yaw = vector3Rotation.z * Math.PI / 180
    return yaw;
}