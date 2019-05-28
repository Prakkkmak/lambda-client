import alt from 'alt';
import game from 'natives';

import * as cef from 'modules/cef/main';
import * as skin from 'modules/skin/main';
import * as camera from 'modules/camera/main';
import * as anim from 'modules/anim/main';
import * as physics from 'modules/physics/main';

export function setPedSpeed(mul)
{
    game.setRunSprintMultiplierForPlayer(game.playerId(), mul);
    game.setSwimMultiplierForPlayer(game.playerId(), mul);
}

export function applyStrongForceToPed(dir, force)
{    
    physics.applyGlobalForceToEntity(game.playerPedId(), dir, force);
}


