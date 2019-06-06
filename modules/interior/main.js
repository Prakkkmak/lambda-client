import * as game from 'natives';
export function loadIpl(ipl) {
    game.requestIpl(ipl);
}
export function unLoadIpl(ipl) {
    game.removeIpl(ipl);
}