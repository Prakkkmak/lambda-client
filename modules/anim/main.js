import * as alt from 'alt';
import * as game from 'natives';

export function playAnim(dict, anim, animFlag) {
    if (arguments.length == 2) {
        if (game.hasAnimDictLoaded(dict)) {
            game.taskPlayAnim(alt.getLocalPlayer().scriptID, dict, anim, 8, 1, -1, 0, 0, 0, 0, 0);
        } else {
            loadAnimDict(dict).then(() => {
                game.taskPlayAnim(alt.getLocalPlayer().scriptID, dict, anim, 8, 1, -1, 0, 0, 0, 0, 0);
            });
        }
    } else if (arguments.length == 3) {
        if (game.hasAnimDictLoaded(dict)) {
            game.taskPlayAnim(alt.getLocalPlayer().scriptID, dict, anim, 8, 1, -1, animFlag, 0, 0, 0, 0);
        } else {
            loadAnimDict(dict).then(() => {
                game.taskPlayAnim(alt.getLocalPlayer().scriptID, dict, anim, 8, 1, -1, animFlag, 0, 0, 0, 0);
            });
        }
    }
}

export function loadAnimDict(dict) {
    game.requestAnimDict(dict);
    return new Promise((resolve, reject) => {
        let check = alt.setInterval(() => {

            if (game.hasAnimDictLoaded(dict)) {
                alt.clearInterval(check);
                alt.log('Anim dict loaded');
                resolve(true);
            }

        }, (5));
    });
}