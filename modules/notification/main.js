import * as game from 'natives';
import * as alt from 'alt';

export function notification(msg) {
    game.setNotificationTextEntry("STRING");
    game.addTextComponentString(msg)
    game.drawNotification(false, false)
}