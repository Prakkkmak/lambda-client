import * as alt from 'alt';

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
    alt.players.forEach(target => {
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
    alt.players.forEach(target => {
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