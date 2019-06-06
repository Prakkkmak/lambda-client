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


game.setPedDefaultComponentVariation(game.playerPedId());
alt.emitServer("setlicense", alt.getLicenseHash());

alt.on('update', () => {
    input_check(); // Check inputs
});

alt.on('gameEntityCreate', (entity) => {
    const isPlayer = entity.constructor.name === "Player"
    if (isPlayer) alt.players.push(entity);
    alt.log("new entity ");
    alt.log("number player " + alt.players.length)
})

alt.on('gameEntityDestroy', (entity) => {
    const isPlayer = entity.constructor.name === "Player"
    if (isPlayer) alt.players.splice(alt.players.indexOf(entity));
})