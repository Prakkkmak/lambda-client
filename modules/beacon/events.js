

import * as alt from 'alt';
import * as beacon from "modules/beacon/main"
alt.onServer("attachBeaconToPlayer", (player) => {
    beacon.attachBeaconToPlayer(player);
})
alt.onServer("detachBeaconToPlayer", (player) => {
    beacon.dettachBeaconToPlayer(player);
})

