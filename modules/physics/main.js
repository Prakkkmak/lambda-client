import * as game from 'natives';
import * as alt from 'alt';
import * as camera from 'modules/camera/main';

export function applyGlobalForceToEntity(entity, dir, force, type = 1, scaleForce = true) {
    game.applyForceToEntityCenterOfMass(entity, 1, dir.x * force, dir.y * force, dir.z * force, type, false, scaleForce, false);
}
export function applyLocalForceToEntity(entity, dir, force, type = 1, scaleForce = true) {
    game.applyForceToEntityCenterOfMass(entity, 1, dir.x * force, dir.y * force, dir.z * force, type, true, scaleForce, false);
}
export function raycastPointToPoint(pointA, pointB, flags)
{
    let ray = game.startShapeTestRay(pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z, flags, game.playerPedId(), 0);
    return game.getShapeTestResult(ray);
}
export function raycastExPointToPoint(pointA, pointB, flags)
{
    let ray = game.startShapeTestRayEx(pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z, flags, game.playerPedId(), 0);
    let [r, hit, endCoords, surfaceNormal, entityHit] = game.getShapeTestResult(ray);
    return {
        retval: r,
        hasHit: hit,
        point: {x: endCoords.x, y: endCoords.y, z:endCoords.z},
        normal: {x: surfaceNormal.x, y: surfaceNormal.y, z:surfaceNormal.z},
        entity: entityHit
    };
}
