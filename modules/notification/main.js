import * as game from 'natives';
import * as alt from 'alt';

export function showNotification(msg, time=5) {
    game.setNotificationTextEntry("STRING");
    game.addTextComponentString(msg)
    let n = game.drawNotification(false, false);

    alt.setTimeout(() => {
        game.removeNotification(n);
    }, time*1000)
}
