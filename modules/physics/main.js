import * as game from 'natives';
import * as alt from 'alt';
import * as camera from 'modules/camera/main';
import * as matrix from 'modules/utils/matrix';

let pointA;
let pointB;
let point;


export function applyGlobalForceToEntity(entity, dir, force, type = 1, scaleForce = true) {
    game.applyForceToEntityCenterOfMass(entity, 1, dir.x * force, dir.y * force, dir.z * force, type, false, scaleForce, false);
}
export function applyLocalForceToEntity(entity, dir, force, type = 1, scaleForce = true) {
    game.applyForceToEntityCenterOfMass(entity, 1, dir.x * force, dir.y * force, dir.z * force, type, true, scaleForce, false);
}
// export function raycastPointToPoint(pointA, pointB, flags = -1)
// {
//     let ray = game.startShapeTestRay(pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z, flags, alt.Player.local.scriptID, 0);
//     return game.getShapeTestResult(ray);
// }
export function raycastPointToPoint(pointA, pointB, flags = -1)
{
    let ray = game.startShapeTestRay(pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z, flags, alt.Player.local.scriptID, 0);
    let [r, hit, endCoords, surfaceNormal, entityHit] = game.getShapeTestResultEx(ray);
    return {
        retval: r,
        hasHit: hit,
        point: {x: endCoords.x, y: endCoords.y, z:endCoords.z},
        normal: {x: surfaceNormal.x, y: surfaceNormal.y, z:surfaceNormal.z},
        entity: entityHit
    };
}
export function raycastScreenToPoint(screenPoint, dist, cam = 'gameplay')
{
    let [a, w, h] = game.getActiveScreenResolution(0, 0);
    let x = (2 * screenPoint.x)/w - 1;
    let y = (2 * screenPoint.y)/h - 1;

    alt.log(x);
    alt.log(y)


    let c;

    if(typeof(cam) == 'string')
    {
        if(camera.doesCamExist(cam))
        {
            c = camera.getCam(cam);
        } else if(cam == 'gameplay'){
            c = camera.createCam(cam);
        }
    } 

    let proj = c.projection_matrix;
    proj.cells[2][2] = proj.cells[2][3] = 1;

    let inv_proj = proj.inverse;
    inv_proj.cells[3][3] = 0;

    let transpose_cells = new Array(4).fill(0).map(x => new Array(4).fill(0));
    transpose_cells[0][0] = 1;
    transpose_cells[1][2] = -1;
    transpose_cells[2][1] = -1;
    transpose_cells[3][3] = 1;

    let transpose_matrix = new matrix.Matrix(transpose_cells);

    pointA = new matrix.Vector4(x,y,1,0);
    pointA.x *= pointA.w;
    pointA.y *= pointA.w;

    pointB = new matrix.Vector4(x,y,1,dist);
    pointB.x *= pointB.w;
    pointB.y *= pointB.w;

    // pointA.display();
    // pointB.display();
    // transpose_matrix.mul(inv_proj.mul(pointB)).display();

    pointA = c.model_matrix.mul(transpose_matrix.mul(inv_proj.mul(pointA)));
    pointB = c.model_matrix.mul(transpose_matrix.mul(inv_proj.mul(pointB)));

    

    let hit = raycastPointToPoint(pointA, pointB);
    point = hit.point;
    return hit;
    //physics.raycastPointToPoint()

}

alt.on('update', () => {

    if(pointA != undefined && pointB != undefined && point != undefined) 
    {
        game.drawLine(pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z, 255, 255, 255, 255);
        game.drawBox(point.x-0.1, point.y-0.1,point.z-0.1,point.x+0.1,point.y+0.1,point.z+0.1, 255,0,0,255);
    }
})