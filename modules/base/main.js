import game from 'natives';
export function freeze(value) {
    game.freezeEntityPosition(game.playerPedId(), value);
    //setControlsEnabled(value);
}
export function ragdoll() {
    game.setPedToRagdoll(game.playerPedId(), 1000, 1000, 0, 0, 0, 0);
}