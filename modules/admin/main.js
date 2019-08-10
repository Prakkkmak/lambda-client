import * as alt from 'alt';
import * as game from 'natives';

import * as character from 'modules/character/main';
import * as camera from 'modules/camera/main';
import * as physics from 'modules/physics/main';

let invincible = false;

let spec = false;
let specCamOffset =
{
    x: 0,
    y: -8,
    z: 0
};
let specEntity = 0;
let beforeSpecPos = undefined;

let freeCam = false;
let freeCamPosition = 
{
    x: 0,
    y: 0,
    z: 0
}
const freeCamRotSpeed = 8;
const freeCamMoveSpeed = 5;

export function enableInvisibility() {
    game.setEntityVisible(alt.Player.local.scriptID, false);
}
export function disableInvisibility() {
    game.setEntityVisible(alt.Player.local.scriptID, true);
}
export function toggleInvisibility() {
    if (game.isEntityVisible(alt.Player.local.scriptID)) {
        enableInvisibility();
    } else {
        disableInvisibility();
    }
}
/*
export function enableInvicibility() {
    game.setEntityInvincible(alt.Player.local.scriptID, true);
}
export function disableInvicibility() {
    game.setPlayerInvincible(game.playerId(), false);
}*/
export function toggleInvincibility() {
    alt.log("toggle invincibility triggered");
    game.setPlayerInvincible(game.playerId(), !game.getPlayerInvincible());
}


export function enableNoClip() {
    game.setEntityCollision(alt.Player.local.scriptID, false, false);
}
export function disableNoClip() {
    game.setEntityCollision(alt.Player.local.scriptID, true, true);
}
export function toggleNoClip() {
    if (game.getEntityCollisonDisabled(alt.Player.local.scriptID)) {
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
export function enableFreeCam()
{
    if(!spec && !freeCam)
    {
        alt.log('starting freecam')

        freeCamPosition = game.getEntityCoords(alt.Player.local.scriptID, false);

        camera.createCam('freecam', {x:0, y:0, z:0}, {x:0, y:0, z:0}, 90).renderCam();
        
        freeCam = true;
    }
}
export function disableFreeCam()
{
    if(freeCam)
    {
        alt.log('stopping freecam')

        freeCam = false;

        camera.goBackToGameplayCam();
        camera.getCam('freecam').destroy();

        game.clearHdArea();
        game.clearFocus();
    }
}

export function enableSpecMode(entity) {
    if (!spec) {
        specEntity = entity;

        beforeSpecPos = game.getEntityCoords(alt.Player.local.scriptID, false);

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
        game.setEntityCoords(alt.Player.local.scriptID, beforeSpecPos.x, beforeSpecPos.y, beforeSpecPos.z, false, false, false, false);

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


    if (game.isPedInAnyVehicle(alt.Player.local.scriptID, false)) {
        physics.applyGlobalForceToEntity(game.getVehiclePedIsIn(alt.Player.local.scriptID, false), dir, 25);
    } else {
        character.applyStrongForceToPed(dir, 25);
    }

}

alt.on('update', () => {
    if(spec && camera.doesCamExist('speccam'))
    {
        let pos = game.getEntityCoords(specEntity, false);

        let gCamPos = game.getGameplayCamCoord();
        let pPos = game.getEntityCoords(alt.Player.local.scriptID, false);

        specCamOffset.x = gCamPos.x - pPos.x;
        specCamOffset.y = gCamPos.y - pPos.y;
        specCamOffset.z = gCamPos.z - pPos.z;

        camera.getCam('speccam').setPosition({
            x: pos.x + specCamOffset.x,
            y: pos.y + specCamOffset.y,
            z: pos.z + specCamOffset.z
        });


        game.setEntityCoords(alt.Player.local.scriptID, pos.x, pos.y, pos.z - 10, false, false, false, false);
    }
    if (freeCam && camera.doesCamExist('freecam'))
    {

        game.disableControlAction(0, 30, true);
        game.disableControlAction(0, 31, true);
        game.disableControlAction(0, 1, true);
        game.disableControlAction(0, 2, true);
        game.disableControlAction(0, 25, true);
        game.disableControlAction(0, 106, true);
      
        game.disableControlAction(0, 24, true);
        game.disableControlAction(0, 140, true);
        game.disableControlAction(0, 141, true);
        game.disableControlAction(0, 142, true);
        game.disableControlAction(0, 257, true);
        game.disableControlAction(0, 263, true);
        game.disableControlAction(0, 264, true);
      
        game.disableControlAction(0, 12, true);
        game.disableControlAction(0, 14, true);
        game.disableControlAction(0, 15, true);
        game.disableControlAction(0, 16, true);
        game.disableControlAction(0, 17, true);

        if(game.isControlPressed(0, 32))
        {
            freeCamPosition = 
            {
                x: freeCamPosition.x + camera.getCam('freecam').getForwardVector().x * freeCamMoveSpeed,
                y: freeCamPosition.y + camera.getCam('freecam').getForwardVector().y * freeCamMoveSpeed,
                z: freeCamPosition.z + camera.getCam('freecam').getForwardVector().z * freeCamMoveSpeed
            }
        }

        if(game.isControlPressed(0, 33))
        {
            freeCamPosition = 
            {
                x: freeCamPosition.x - camera.getCam('freecam').getForwardVector().x * freeCamMoveSpeed,
                y: freeCamPosition.y - camera.getCam('freecam').getForwardVector().y * freeCamMoveSpeed,
                z: freeCamPosition.z - camera.getCam('freecam').getForwardVector().z * freeCamMoveSpeed
            }
        }

        if(game.isControlPressed(0, 34))
        {
            freeCamPosition = 
            {
                x: freeCamPosition.x - camera.getCam('freecam').getRightVector().x * freeCamMoveSpeed,
                y: freeCamPosition.y - camera.getCam('freecam').getRightVector().y * freeCamMoveSpeed,
                z: freeCamPosition.z - camera.getCam('freecam').getRightVector().z * freeCamMoveSpeed
            }
        }

        if(game.isControlPressed(0, 35))
        {
            freeCamPosition = 
            {
                x: freeCamPosition.x + camera.getCam('freecam').getRightVector().x * freeCamMoveSpeed,
                y: freeCamPosition.y + camera.getCam('freecam').getRightVector().y * freeCamMoveSpeed,
                z: freeCamPosition.z + camera.getCam('freecam').getRightVector().z * freeCamMoveSpeed
            }
        }

        let xMagnitude = game.getDisabledControlNormal(0, 1);
        let yMagnitude = game.getDisabledControlNormal(0, 2);

        let rot = game.getCamRot(camera.getCam('freecam').cam, 2)

        rot.x = rot.x - yMagnitude * freeCamRotSpeed;
        rot.y = 0;
        rot.z = rot.z - xMagnitude * freeCamRotSpeed;

        if(rot.x < -45.0) rot.x = -45.0;
        if(rot.x > 45.0) rot.x = 45.0;

        camera.getCam('freecam').setPosition(freeCamPosition);
        camera.getCam('freecam').setRotation(rot);

        game.setFocusArea(freeCamPosition.x, freeCamPosition.y, freeCamPosition.z, 0.0, 0.0, 0.0)
        game.setHdArea(freeCamPosition.x, freeCamPosition.y, freeCamPosition.z, 30.0);    }
});