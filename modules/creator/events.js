import * as alt from 'alt';
import * as game from 'natives';
import * as creator from 'modules/creator/main'

alt.onServer("creatorTest", () => {
    creator.start();
})

alt.on('update', () => {
    creator.updateClose();
});

// alt.on('consoleCommand', (command, ...args) => {
//     if(command == 'creatorTest')
//     {
//         creator.start();
//     }
// });