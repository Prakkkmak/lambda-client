/// <reference path="definitions/altv-client.d.ts" />
import * as alt from 'alt';
import * as game from 'natives';
import { input_check } from "inputs_events";

import 'modules/cef/events';
import 'modules/admin/events';
import 'modules/skin/events';
import 'modules/base/events';
import 'modules/voice/events';
import 'modules/weapon/events';
import 'modules/police/events';
import 'modules/interior/events';
import 'modules/character/events';
import 'modules/camera/events';
import 'modules/physics/events';
import 'modules/selection/events';
import 'modules/beacon/events';
import 'modules/door/events';
import 'modules/graphics/events';
import 'modules/light/events';
import 'modules/particles/events';
import 'modules/prop/events';
import 'modules/utils/matrix';
//import 'modules/notification/events';

game.setPedDefaultComponentVariation(alt.Player.local.scriptID);
alt.emitServer("setlicense", alt.getLicenseHash());

alt.on('update', () => {
    input_check(); // Check inputs
});

game.setEntityCoords(alt.Player.local.scriptID, 0,0, 72, false, false, false, false);
game.setEntityHealth(alt.Player.local.scriptID, 100);
game.setEntityCollision(alt.Player.local.scriptID, true, true);
/*
alt.on('gameEntityCreate', (entity) => {
    const isPlayer = entity instanceof alt.Player
    if (isPlayer) alt.Player.all.push(entity);
})

alt.on('gameEntityDestroy', (entity) => {
    const isPlayer = entity instanceof alt.Player
    if (isPlayer) alt.Player.all.splice(alt.Player.all.indexOf(entity));
})*/