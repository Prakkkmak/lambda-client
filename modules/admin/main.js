import alt from 'alt';
import game from 'natives';

import * as character from 'modules/character/main';
import * as camera from 'modules/camera/main';

export function enableInvisibility()
{
    game.networkSetEntityInvisibleToNetwork(game.playerPedId(), true);
}
export function disableInvisibility()
{
    game.networkSetEntityInvisibleToNetwork(game.playerPedId(), false);
}

export function enableInvicibility()
{
    game.setPlayerInvincible(game.playerId(), true);
}
export function disableInvicibility()
{
    game.setPlayerInvincible(game.playerId(), false);
}

export function dashToCam()
{
    let dir = camera.getGameplayCamDirVector(game.getGameplayCamRot(0));
    character.applyStrongForceToPed(dir, 25);
}

export function enableHighSpeed()
{
    character.setPedSpeed(1.49);
}
export function disableHighSpeed()
{
    character.setPedSpeed(1.00);
}
