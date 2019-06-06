import * as alt from 'alt';
import * as door from "modules/door/main"
alt.onServer("closeDoortest", (player) => {
    door.closeDoorTest(player);
})
alt.onServer("openDoortest", (player) => {
    door.openDoorTest(player);
})