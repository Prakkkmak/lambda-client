import * as alt from 'alt';
import * as game from 'natives';
import * as physics from 'modules/physics/main';

import * as base from 'modules/base/main';
import * as matrix from 'modules/utils/matrix';
import * as camera from 'modules/camera/main';
import * as prop from 'modules/prop/main';


alt.onServer('applyForce', (entity, x,y,z) => {
    physics.applyGlobalForceToEntity(entity, {x: x, y:y, z:z},1);
});

// alt.on('consoleCommand', (cmd, ...args) => {
//     if(cmd == 'raycast')
//     {
//         let point = physics.raycastScreenToPoint({x: alt.getCursorPos().x, y:alt.getCursorPos().y}, 99999).point;
//         if(args[0] == 'tp')
//         {
//             game.setEntityCoords(alt.Player.local.scriptID, point.x, point.y, point.z, 0, 0, 0, false);
//         } else if(args[0] == 'spawn')
//         {
//             base.loadModel(args[1]).then(() => {
//                 // alt.log('Pass 0')
//                 // let point = physics.raycastExPointToPoint(pointA.vector, pointB.vector).point;
//                 // alt.log(point);

//                 game.createObject(game.getHashKey(args[1]), point.x, point.y, point.z, true, true, true);
//             });
//         }
//         //physics.raycastPointToPoint()
//     }
// });
