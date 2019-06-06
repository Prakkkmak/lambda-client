import * as alt from 'alt';

start();
export function start() {
    alt.initVoice();
    alt.setMicGain(3);
    alt.enableVoiceInput();
}
