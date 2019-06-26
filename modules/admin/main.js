import * as alt from 'alt';
import * as game from 'natives';

import * as character from 'modules/character/main';
import * as camera from 'modules/camera/main';
import * as physics from 'modules/physics/main';

let invicible = false;

let spec = false;
let specCamOffset =
{
    x: 0,
    y: -8,
    z: 0
};
let specEntity = 0;
let beforeSpecPos = undefined;

export function enableInvisibility() {
    game.setEntityVisible(alt.getLocalPlayer().scriptID, false);
}
export function disableInvisibility() {
    game.setEntityVisible(alt.getLocalPlayer().scriptID, true);
}
export function toggleInvisibility() {
    if (game.isEntityVisible(alt.getLocalPlayer().scriptID)) {
        enableInvisibility();
    } else {
        disableInvisibility();
    }
}

export function enableInvicibility() {
    game.setEntityInvincible(alt.getLocalPlayer().scriptID, true);
}
export function disableInvicibility() {
    game.setEntityInvincible(game.playerId(), false);
}
export function toggleInvicibility() {
    if (invicible) {
        disableInvicibility();

    } else {
        enableInvicibility();
    }
}


export function enableNoClip() {
    game.setEntityCollision(alt.getLocalPlayer().scriptID, false, false);
}
export function disableNoClip() {
    game.setEntityCollision(alt.getLocalPlayer().scriptID, true, true);
}
export function toggleNoClip() {
    if (game.getEntityCollisonDisabled(alt.getLocalPlayer().scriptID)) {
        disableNoClip();
    } else {
        enableNoClip();
    }
}

export function enableFastRun() {
    character.setPedSpeed(1.49);
}
export function disableFastRun() {
    character.setPedSpeed(1.00);
}


export function enableSpecMode(entity) {
    if (!spec) {
        specEntity = entity;

        beforeSpecPos = game.getEntityCoords(alt.getLocalPlayer().scriptID, false);

        camera.createCam('speccam').focusOnBone(camera.ped_bones['SKEL_L_Clavicle'], specCamOffset, 60, 500, specEntity, false);

        enableNoClip();
        enableInvicibility();
        enableInvisibility();

        spec = true;

    }
}
export function disableSpecMode() {
    if (spec && camera.doesCamExist('speccam')) {
        spec = false;

        specEntity = 0;
        game.setEntityCoords(alt.getLocalPlayer().scriptID, beforeSpecPos.x, beforeSpecPos.y, beforeSpecPos.z, false, false, false, false);

        disableNoClip();
        disableInvicibility();
        disableInvisibility();

        camera.goBackToGameplayCam();
        camera.getCam('speccam').destroy();

        beforeSpecPos = undefined;
    }

}
export function testSpecMode() {
    let [retvalue, player] = game.getPlayerTargetEntity(game.playerId());

    if (retvalue) {
        enableSpecMode(player);
    }
}

export function dashToCam() {
    let dir = camera.getGameplayCamDirVector(game.getGameplayCamRot(0));


    if (game.isPedInAnyVehicle(alt.getLocalPlayer().scriptID, false)) {
        physics.applyGlobalForceToEntity(game.getVehiclePedIsIn(alt.getLocalPlayer().scriptID, false), dir, 25);
    } else {
        character.applyStrongForceToPed(dir, 25);
    }

}

alt.on('update', () => {
    if(spec && camera.doesCamExist('speccam'))
    {
        let pos = game.getEntityCoords(specEntity, false);

        let gCamPos = game.getGameplayCamCoord();
        let pPos = game.getEntityCoords(alt.getLocalPlayer().scriptID, false);

        specCamOffset.x = gCamPos.x - pPos.x;
        specCamOffset.y = gCamPos.y - pPos.y;
        specCamOffset.z = gCamPos.z - pPos.z;

        camera.getCam('speccam').setPosition({
            x: pos.x + specCamOffset.x,
            y: pos.y + specCamOffset.y,
            z: pos.z + specCamOffset.z
        });


        game.setEntityCoords(alt.getLocalPlayer().scriptID, pos.x, pos.y, pos.z - 10, false, false, false, false);
    }
});