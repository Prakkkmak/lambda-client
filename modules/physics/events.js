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

alt.on('consoleCommand', (cmd, ...args) => {
    if(cmd == 'raycast')
    {
        let [a, w, h] = game.getActiveScreenResolution(0, 0);
        let x = (2 * alt.getCursorPos().x)/w - 1;
        let y = (2 * alt.getCursorPos().y)/h - 1;
        
        let gameplayCam = camera.createCam('gameplay');



        let proj = gameplayCam.projection_matrix;
        proj.cells[2][2] = proj.cells[2][3] = 1;

        let inv_proj = proj.inverse;
        inv_proj.cells[3][3] = 0;

        let transpose_cells = new Array(4).fill(0).map(x => new Array(4).fill(0));
        transpose_cells[0][0] = 1;
        transpose_cells[1][2] = -1;
        transpose_cells[2][1] = 1;
        transpose_cells[3][3] = 1;

        let transpose_matrix = new matrix.Matrix(transpose_cells);

        let pointA = new matrix.Matrix([[x],[y],[1],[0]]);
        pointA.cells[0][0] *= pointA.cells[3][0];
        pointA.cells[1][0] *= pointA.cells[3][0];

        let pointB = new matrix.Matrix([[x],[y],[1],[100]]);
        pointB.cells[0][0] *= pointB.cells[3][0];
        pointB.cells[1][0] *= pointB.cells[3][0];

        pointA = gameplayCam.model_matrix.mul(transpose_matrix.mul(inv_proj.mul(pointA)));
        pointB = gameplayCam.model_matrix.mul(transpose_matrix.mul(inv_proj.mul(pointB)));

        // pointA.display();
        // pointB.display();

        //physics.raycastPointToPoint()
        base.loadModel(args[0]).then(() => {
            alt.log('Pass 0')
            let point = physics.raycastExPointToPoint(pointA.vector, pointB.vector);
            alt.log(point);
            // alt.log('X:' + point.x)
            // alt.log('Y:' + point.y)
            // alt.log('Z:' + point.z)

            game.createObject(game.getHashKey(args[0]), point.x, point.y, point.z, true, true, true);
        });
    }
});