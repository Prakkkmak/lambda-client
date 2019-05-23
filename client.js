/// <reference path="definitions/altv-client.d.ts" />
import alt from 'alt';
import game from 'natives';
import { input_check } from "inputs_events";

import 'modules/cef/events';
import 'modules/skin/events';
import 'modules/base/events';
import 'modules/voice/events';
import 'modules/weapon/events';
import 'modules/police/events';
import 'modules/interior/events';
import 'modules/character/events';

game.setPedDefaultComponentVariation(game.playerPedId());
alt.emitServer("setlicense", alt.getLicenseHash());

alt.on('update', () => {
    input_check(); // Check inputs
});

