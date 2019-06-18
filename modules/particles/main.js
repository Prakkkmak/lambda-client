
import * as alt from 'alt';
import * as game from 'natives';

var particles = [];

export function loadParticle(ptfx) {
    
    game.requestNamedPtfxAsset(ptfx);
    return new Promise((resolve, reject) => {

        let check = alt.setInterval(() => {

            if (game.hasNamedPtfxAssetLoaded(ptfx)) {
                alt.clearInterval(check);
                alt.log('Ptfx loaded');
                resolve(true);
            }

        }, (5));
    });

}

export function startParticleAtCoord(effectDict, effectName, position, rotation, scale, looped = false)
{
    let handle;
    loadParticle(effectDict).then(() => {
        game.useParticleFxAsset(effectDict);
        if(looped)
        {
            handle = game.startParticleFxLoopedAtCoord(effectName, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, scale, false, false, false, true);
            particles.push(handle);
            return handle;
        } else {
            handle = game.startParticleFxNonLoopedAtCoord(effectName, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, scale, false, false, false);
            
        }
    });
}
export function startParticleOnEntity(effectDict, effectName, entity, offset, rotation, scale, looped = false)
{
    let handle;
    loadParticle(effectDict).then(() => {
        game.useParticleFxAsset(effectDict);
        if(looped)
        {
            handle = game.startParticleFxLoopedOnEntity(effectName, entity, offset.x, offset.y, offset.z, rotation.x, rotation.y, rotation.z, scale, false, false, false);
            particles.push(handle);

            return handle;
        } else {
            handle = game.startParticleFxNonLoopedOnEntity(effectName, entity,offset.x, offset.y, offset.z, rotation.x, rotation.y, rotation.z, scale, false, false, false);
        }
    });
}
export function startParticleOnBone(effectDict, effectName, entity , boneIndex, offset, rotation, scale, looped = false)
{
    let handle;
    loadParticle(effectDict).then(() => {
        game.useParticleFxAsset(effectDict);
        if(looped)
        {
            handle = game.startParticleFxLoopedOnPedBone(effectName, entity, offset.x, offset.y, offset.z, rotation.x, rotation.y, rotation.z, boneIndex, scale, false, false, false);
            particles.push(handle);

            return handle;
        } else {
            handle = game.startParticleFxNonLoopedOnPedBone(effectName, entity,offset.x, offset.y, offset.z, rotation.x, rotation.y, rotation.z, boneIndex, scale, false, false, false);
        }
    });
}
export function destroyParticle(handle)
{
    game.stopParticleFxLooped(handle, false);
}