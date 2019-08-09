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
import 'modules/prop/events';
import 'modules/creator/events';
import 'modules/time/events';
import 'modules/quest/events';
//import 'modules/notification/events';


game.setPedDefaultComponentVariation(game.playerPedId());

alt.toggleGameControls(true);

alt.emitServer("setlicense", alt.getLicenseHash(),alt.discordInfo().id);
alt.log(JSON.stringify(alt.discordInfo()));

alt.on('update', () => {
    //alt.toggleGameControls(true);
    input_check(); // Check inputs
});


/*
alt.on('gameEntityCreate', (entity) => {
    const isPlayer = entity instanceof alt.Player
    if (isPlayer) alt.Player.all.push(entity);
})

alt.on('gameEntityDestroy', (entity) => {
    const isPlayer = entity instanceof alt.Player
    if (isPlayer) alt.Player.all.splice(alt.Player.all.indexOf(entity));
})*/