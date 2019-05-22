import alt from 'alt';

start();
export function start() {
    alt.initVoice();
    alt.setMicGain(0);
    alt.disableVoiceInput();
}
