import * as alt from 'alt';
import * as game from 'natives';

import * as light from 'modules/light/main';
import * as character from 'modules/character/main';
import * as camera from 'modules/camera/main';

// alt.on('consoleCommand', (command, ...args) => {
//     if(command == 'createlight')
//     {
//         if(args[0] == 'point')
//         {
//             if(args.length == 7)
//             {
//                 let l = new light.PointLight(args[1], character.getPosition(), {r: Number.parseInt(args[2]), g: Number.parseInt(args[3]), b: Number.parseInt(args[4])}, JSON.parse(args[5]), JSON.parse(args[6]));
//             } else {
//                 alt.logWarning('createlight point {id} {R} {G} {B} {range} {intensity} [shadow] [active]');
//             }
//         } else if(args[0] == 'spot') {
            
//             if(args.length == 10)
//             {
//                 let lightPos = character.getPosition();
//                 lightPos.z += 50;
//                 let l = new light.SpotLight(args[1], lightPos, camera.getGameplayCamDirVector(), {r: Number.parseInt(args[2]), g: Number.parseInt(args[3]), b: Number.parseInt(args[4])}, Number.parseFloat(args[5]), Number.parseFloat(args[6]),Number.parseFloat(args[7]), JSON.parse(args[8]), JSON.parse(args[9]));
//             } else {
//                 alt.logWarning('createlight spot {id} {R} {G} {B} {distance} {brightness} {roundness} {radius} {falloff} [shadow] [active]');
//             }
//         } else {
//             alt.logError('Invalid light type: point, spot');
//         }
//     } else if(command == 'clearlights')
//     {
//         light.clearLights();
//     }
// });