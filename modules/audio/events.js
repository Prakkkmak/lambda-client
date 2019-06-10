import * as alt from 'alt';

import * as audio from 'modules/audio/main';

alt.onServer('playSoundCoord', (audioName, audioRef, posX, posY, posZ, range) => {
    audio.playSoundFromCoord(audioName, audioRef, posX, posY, posZ, range);
});