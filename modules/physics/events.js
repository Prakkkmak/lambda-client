import alt from 'alt';
import * as physics from 'modules/physics/main';

alt.onServer('applyForce', (entity, x,y,z) => {
    physics.applyGlobalForceToEntity(entity, {x: x, y:y, z:z},1);
});