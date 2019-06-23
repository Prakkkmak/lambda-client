import * as game from 'natives';

export function playSound(audioName, audioRef)
{
    game.playSound(-1, audioName, audioRef, false, false, false);
}
export function playSoundFromCoord(audioName, audioRef, pos, range)
{
    game.playSoundFromCoord(-1, audioName, pos.x, pos.y, pos.z, audioRef, false, range, false);
}
export function playSoundFrontend(audioName, audioRef)
{
    game.playSoundFrontend(-1, audioName, audioRef, false);
}