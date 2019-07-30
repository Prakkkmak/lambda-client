import * as game from 'natives';
import * as alt from 'alt';

import * as character from 'modules/character/main';

alt.onServer('clearPedDamage', () => {
    game.clearPedBloodDamage();
});

// alt.on('consoleCommand', (command, ...args) => {
//     if(command == 'setposition')
//     {
//         character.setPosition( {x : Number.parseFloat(args[0]), y : Number.parseFloat(args[1]), z : Number.parseFloat(args[2]) });
//     } else if (command == 'getposition') 
//     {
//         let playerPos = character.getPosition();
//         alt.log('Player x position: ' + playerPos.x);
//         alt.log('Player y position: ' + playerPos.y);
//         alt.log('Player z position: ' + playerPos.z);
//     }
// });