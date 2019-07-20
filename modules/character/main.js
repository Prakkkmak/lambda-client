import * as alt from 'alt';
import * as game from 'natives';

import * as cef from 'modules/cef/main';
import * as skin from 'modules/skin/main';
import * as camera from 'modules/camera/main';
import * as anim from 'modules/anim/main';
import * as physics from 'modules/physics/main';

export function ragdoll() {
    game.setPedToRagdoll(alt.Player.local.scriptID, 1000, 1000, 0, 0, 0, 0);
}

export function setPedSpeed(mul) {
    game.setRunSprintMultiplierForPlayer(game.playerId(), mul);
    game.setSwimMultiplierForPlayer(game.playerId(), mul);
}

export function applyStrongForceToPed(dir, force) {
    physics.applyGlobalForceToEntity(alt.Player.local.scriptID, dir, force);
}

export function setPosition(position)
{
    
    game.setEntityCoords(alt.Player.local.scriptID, position.x, position.y, position.z, true, false, false, false);
}
export function getPosition()
{
    return game.getEntityCoords(alt.Player.local.scriptID, true);
}

export function setRotation(rotation)
{
    game.setEntityRotation(alt.Player.local.scriptID,rotation.pitch, rotation.roll, rotation.yaw, 2);
}

