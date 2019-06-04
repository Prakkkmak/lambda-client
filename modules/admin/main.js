import alt from 'alt';
import game from 'natives';

import * as character from 'modules/character/main';
import * as camera from 'modules/camera/main';
import * as physics from 'modules/physics/main';

let invicible = false;

let spec = false;
let specCamOffset = 
{
    x : 0,
    y : -8,
    z : 0
};
let specEntity = 0;
let beforeSpecPos = undefined;

export function enableInvisibility()
{
    game.setEntityVisible(game.playerPedId(), false);
}
export function disableInvisibility()
{
    game.setEntityVisible(game.playerPedId(), true);
}
export function toggleInvisibility()
{
    if(game.isEntityVisible())
    {
        enableInvisibility();
    } else
    {
        disableInvisibility();
    }
}

export function enableInvicibility()
{
    game.setEntityInvincible(game.playerPedId(), true);
}
export function disableInvicibility()
{
    game.setEntityInvincible(game.playerId(), false);
}
export function toggleInvicibility()
{
    if(invicible)
    {
        disableInvicibility();

    } else
    {
        enableInvicibility();    
    }
}


export function enableNoClip()
{
    game.setEntityCollision(game.playerPedId(), false, false);
}
export function disableNoClip()
{
    game.setEntityCollision(game.playerPedId(), true, true);
}
export function toggleNoClip()
{
    if(game.getEntityCollisonDisabled(game.playerPedId()))
    {
        disableNoClip();
    } else
    {
        enableNoClip();    
    }
}

export function enableFastRun()
{
    character.setPedSpeed(1.49);
}
export function disableFastRun()
{
    character.setPedSpeed(1.00);
}


export function enableSpecMode(entity)
{
    if(!spec)
    {
        specEntity = entity;
    
        beforeSpecPos = game.getEntityCoords(game.playerPedId(), false);
    
        camera.createCam('speccam').focusOnBone(camera.ped_bones['SKEL_L_Clavicle'], specCamOffset, 60, 500, specEntity);

        enableNoClip();
        enableInvicibility();
        enableInvisibility();

        spec = true;

    }
}
export function disableSpecMode()
{
    if(spec && camera.doesCamExists('speccam'))
    {
        spec = false;
        specEntity = 0;
        game.setEntityCoords(game.playerPedId(), beforeSpecPos.x, beforeSpecPos.y, beforeSpecPos.z, false, false, false, false);
    
        disableNoClip();
        disableInvicibility();
        disableInvisibility();
    
        camera.goBackToGameplayCam();
        camera.getCam('speccam').destroy();
    
        beforeSpecPos = undefined;
    }

}
export function testSpecMode()
{
    let [retvalue, player] = game.getPlayerTargetEntity(game.playerId());

    if(retvalue)
    {
        enableSpecMode(player);
    }
}

export function dashToCam()
{
    let dir = camera.getGameplayCamDirVector(game.getGameplayCamRot(0));


    if(game.isPedInAnyVehicle(game.playerPedId(), false))
    {
        physics.applyGlobalForceToEntity(game.getVehiclePedIsIn(game.playerPedId(), false), dir, 25);
    } else 
    {
        character.applyStrongForceToPed(dir, 25);
    }
    
}

alt.on('update', () => {
    if(spec)
    {
        let pos = game.getEntityCoords(specEntity, false);

        let gCamPos = game.getGameplayCamCoord();
        let pPos = game.getEntityCoords(game.playerPedId(), false);

        specCamOffset.x = gCamPos.x - pPos.x;
        specCamOffset.y = gCamPos.y - pPos.y;
        specCamOffset.z = gCamPos.z - pPos.z;

        camera.getCam('speccam').setPosition({
            x: pos.x + specCamOffset.x, 
            y: pos.y + specCamOffset.y,
            z: pos.z + specCamOffset.z
        });


        game.setEntityCoords(game.playerPedId(), pos.x, pos.y, pos.z - 10, false, false, false, false);
    }
});