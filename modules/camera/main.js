/// <reference path="../../definitions/altv-client.d.ts" />

import * as game from 'natives';
import * as alt from 'alt';

import * as base from 'modules/base/main';

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

        alt.nextTick(() => {
            if (doesCamExist(id)) {
                game.destroyCam(cam[id].cam, false);
            }
            this.cam = game.createCam('DEFAULT_SCRIPTED_CAMERA', false);
            this.setPosition(position.x, position.y, position.z);
            this.setRotation(rotation.x, rotation.y, rotation.z);
            this.setFov(fov);
            game.setCamActive(this.cam, true);


            cam.push(this);
        });
    }

    focusOnBone(bone, offset, fov, easeTime, ped, attach) {
        bone = (typeof (bone) == 'string') ? ped_bones[bone] : bone;
        alt.nextTick(() => {
            this.setFov(fov);
            game.pointCamAtPedBone(this.cam, ped, bone, 0, 0, 0, true);
            if (attach) {
                game.attachCamToPedBone(this.cam, ped, bone, offset.x, offset.y, offset.z, true);
            }
            game.renderScriptCams(true, true, easeTime, true, false);
        });
    }

    focusOnEntity(entity, offset, offsetPoint = { x: 0, y: 0, z: 0 }, relative = true) {
        alt.nextTick(() => {
            game.pointCamAtEntity(this.cam, entity, offsetPoint.x, offsetPoint.y, offsetPoint.z, true);
            game.renderScriptCams(true, true, 500, true, false);
        });
    }

    setPosition(position) {
        game.setCamCoord(this.cam, position.x, position.y, position.z);
    }

    setRotation(rotation) {
        game.setCamRot(this.cam, rotation.x, rotation.y, rotation.z);
    }

    setFov(fov) {
        game.setCamFov(this.cam, fov);
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
}


export function createCam(id, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, fov = 30) {
    if (doesCamExist(id)) {
        let c = getCam(id);
        c.setPosition(position.x, position.y, position.z);
        c.setRotation(rotation.x, rotation.y, rotation.z);
        c.setFov(fov);

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
