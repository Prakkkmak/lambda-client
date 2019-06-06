import * as game from 'natives';
import * as alt from 'alt';
import * as camera from 'modules/camera/main';

export function applyGlobalForceToEntity(entity, dir, force, type = 1, scaleForce = true) {
    game.applyForceToEntityCenterOfMass(entity, 1, dir.x * force, dir.y * force, dir.z * force, type, false, scaleForce, false);
}
export function applyLocalForceToEntity(entity, dir, force, type = 1, scaleForce = true) {
    game.applyForceToEntityCenterOfMass(entity, 1, dir.x * force, dir.y * force, dir.z * force, type, true, scaleForce, false);
}