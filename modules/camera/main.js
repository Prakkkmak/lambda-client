/// <reference path="../../definitions/altv-client.d.ts" />

import * as game from 'natives';
import * as alt from 'alt';

import * as base from 'modules/base/main';
import * as matrix from 'modules/utils/matrix';

export const ped_bones =
{
    'IK_Head': 0x322c,
    'SKEL_Head ': 0x796E,
    'FACIAL_facialRoot': 0xFE2C,
    'SKEL_Spine2': 0x60f1,
    'SKEL_Root': 0x0,
    'SKEL_L_Clavicle': 0xfcd9
};

var cam = [];

export class Camera {
    constructor(id, position, rotation, fov) {
        
        this.id = id;

        if (doesCamExist(id) && id != 'gameplay') {
            game.destroyCam(cam[id].cam, false);
        }
        if(id != 'gameplay')
        {
            this.cam = game.createCam('DEFAULT_SCRIPTED_CAMERA', false);
            this.setPosition(position.x, position.y, position.z);
            this.setRotation(rotation.x, rotation.y, rotation.z);
            this.setFov(fov);
            game.setCamActive(this.cam, true);
        }


        cam.push(this);
    }

    get position()
    {
        if(this.id == 'gameplay')
        {
            return game.getGameplayCamCoord();
        }
        return game.getCamCoord(this.cam);
    }

    get rotation()
    {        
        if(this.id == 'gameplay')
        {
            return game.getGameplayCamRot(2);
        }

        return game.getCamRot(this.cam, 2);
    }

    get fov()
    {
        if(this.id == 'gameplay')
        {
            return game.getGameplayCamFov();
        }

        return game.getCamFov(this.cam);
    }

    get near_clip()
    {
        if(this.id == 'gameplay')
        {
            return 0.15;
        }
        return game.getCamNearClip(this.cam);
    }

    get far_clip()
    {
        if(this.id == 'gameplay')
        {
            return game.getGameplayCamFarClip();
        }
        return game.getCamFarClip(this.cam);
    }

    get model_matrix()
    {
        return matrix.translation(this.position).mul(matrix.rotation(this.rotation.x* 0.0174532924, this.rotation.y* 0.0174532924, this.rotation.z* 0.0174532924));
    }

    get view_matrix()
    {
        let transpose_cells = new Array(4).fill(0).map(x => new Array(4).fill(0));
        transpose_cells[0][0] = 1;
        transpose_cells[1][2] = 1;
        transpose_cells[2][1] = -1;
        transpose_cells[3][3] = 1;

        let transpose_matrix = new matrix.Matrix(transpose_cells);
        // let view_matrix = transpose_matrix.mul(
        //     matrix.com_rotation(-this.rotation.x* 0.0174532924, -this.rotation.y* 0.0174532924, -this.rotation.z* 0.0174532924).mul(
        //         matrix.translation({
        //         x: -this.position.x,
        //         y: -this.position.y,
        //         z: -this.position.z
        // })));

        let view_matrix = transpose_matrix.mul(this.model_matrix.inverse);

        return view_matrix;
    }

    get projection_matrix()
    {
        let [a, width, height] = game.getActiveScreenResolution(0,0);
        let ar = width/height;

        let S = 1/(Math.tan((this.fov * 0.5) * 0.0174532924));

        
        let projection_matrix = matrix.Matrix.identity(4);
        projection_matrix.cells[0][0] = S/ar;
        projection_matrix.cells[1][1] = S;

        projection_matrix.cells[2][2] = -(this.far_clip + this.near_clip)/(this.far_clip-this.near_clip);
        projection_matrix.cells[2][3] = -(2*this.far_clip*this.near_clip)/(this.far_clip-this.near_clip);
        projection_matrix.cells[3][2] = -1;
        projection_matrix.cells[3][3] = 0;

        return projection_matrix;
    }

    

    focusOnBone(bone, offset, fov, easeTime, ped, attach) {
        bone = (typeof (bone) == 'string') ? ped_bones[bone] : bone;
        this.setFov(fov);
        game.pointCamAtPedBone(this.cam, ped, bone, 0, 0, 0, true);
        if (attach) {
            game.attachCamToPedBone(this.cam, ped, bone, offset.x, offset.y, offset.z, true);
        }
        game.renderScriptCams(true, true, easeTime, true, false);
        return this;
    }

    focusOnEntity(entity, offset, offsetPoint = { x: 0, y: 0, z: 0 }, relative = true) {
        game.pointCamAtEntity(this.cam, entity, offsetPoint.x, offsetPoint.y, offsetPoint.z, true);
        game.renderScriptCams(true, true, 500, true, false);

        return this;
    }

    setPosition(position) {
        game.setCamCoord(this.cam, position.x, position.y, position.z);

        return this;
    }

    setRotation(rotation) {
        game.setCamRot(this.cam, rotation.x, rotation.y, rotation.z);

        return this;
    }

    setFov(fov) {
        game.setCamFov(this.cam, fov);
        
        return this;
    }

    destroy() {
        game.destroyCam(this.cam, false);

        for (var i = 0; i < cam.length; i++) {
            if (cam[i].id === this.id) {
                cam.splice(i, 1);
            }
        }
    }

    renderCam() {
        game.setCamActive(this.cam, true);
        game.renderScriptCams(true, true, 500, true, false);
    }

    getForwardVector() {
        let rotation = game.getCamRot(this.cam, 2);
    
        let Z = rotation.z;
        let num = Z * 0.0174532924;
        let X = rotation.x;
        let num2 = X * 0.0174532924;
        let num3 = Math.abs(Math.cos(num2));
    
        let dir = {
            x: (((-Math.sin(num))) * num3),
            y: ((Math.cos(num)) * num3),
            z: Math.sin(num2)
        };
    
        return dir;
    }
    
    getRightVector() {
        
        
        let cells = new Array(4).fill(0).map(x => Array(1).fill(0));
        cells[0][0] = 1;
        cells[3][0] = 1;

        let right = new matrix.Matrix(cells);
        let right_global = matrix.rotation(this.rotation.x*0.0174532924, this.rotation.y*0.0174532924, this.rotation.z*0.0174532924).mul(right);
        
        //right_global.display();
        return {
            x: right_global.cells[0][0],
            y: right_global.cells[1][0],
            z: right_global.cells[2][0]
        };
    }

    screenPointToWorldPoint(pixelCoords, z)
    {
        let fov = game.getCamFov(this.cam);
    }

    screenPointToViewportPoint(pixelCoords)
    {
        return {
            x: pixelCoords.x/getScreenResolution().width - 0.5,
            y: pixelCoords.y/getScreenResolution().height - 0.5
        }
    }
}


export function createCam(id, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, fov = 30) {
    
    if (doesCamExist(id)) {
        getCam(id).setPosition(position.x, position.y, position.z);
        getCam(id).setRotation(rotation.x, rotation.y, rotation.z);
        getCam(id).setFov(fov);

        return getCam(id);
    } else {
        return new Camera(id, position, rotation, fov);
    }
}
export function getCam(camID) {
    
    for (let i = 0; i < cam.length; i++) {
        if (cam[i].id == camID) {
            return cam[i];
        }
    }
    

    return undefined;
}
export function doesCamExist(camID) {
    for (let i = 0; i < cam.length; i++) {
        if (cam[i].id == camID) return true;
    }

    return false;
}

export function goBackToGameplayCam() {

    alt.nextTick(() => {
        game.renderScriptCams(false, false, 0, true, true);
    });

}
export function getGameplayCamDirVector() {
    let rotation = game.getGameplayCamRot();

    let Z = rotation.z;
    let num = Z * 0.0174532924;
    let X = rotation.x;
    let num2 = X * 0.0174532924;
    let num3 = Math.abs(Math.cos(num2));

    let dir = {
        x: (((-Math.sin(num))) * num3),
        y: ((Math.cos(num)) * num3),
        z: Math.sin(num2)
    };

    return dir;
}

export function getScreenResolution()
{
    let [x, y] = game.getActiveScreenResolution();
    return {width: x, height: y}
}