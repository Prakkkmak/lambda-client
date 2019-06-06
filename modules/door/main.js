/// <reference path="definitions/altv-client.d.ts" />
import * as game from 'natives';
export function closeDoorTest() {
    game.doorControl(631614199, 461.8065, -997.6583, 25.06443, 1, 0, 50, 0);
}
export function openDoorTest() {
    game.doorControl(631614199, 461.8065, -997.6583, 25.06443, 0, 0, 50, 0);
}