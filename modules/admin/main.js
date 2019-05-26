import alt from 'alt';
import game from 'natives';

import * as character from 'modules/character/main';

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

export function enableHighSpeed()
{
    character.setSpeed(1.49);
}
export function disableHighSpeed()
{
    character.setSpeed(1.00);
}
