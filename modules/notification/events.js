import * as alt from 'alt';
import * as game from 'natives';

import * as notification from 'modules/notification/main';

alt.onServer('showNotification', (message, time) => {
    notification.showNotification(message, time)
});

// alt.on('consoleCommand', (cmd, ...args) => {
//     if(cmd=='notification')
//     {
//         notification.showNotification(args[0], Number(args[1]))
//     }
// });