import * as alt from 'alt';
import * as game from 'natives';
import * as creator from 'modules/creator/main'

alt.onServer("creatorTest", () => {
    creator.start();
})

alt.on('update', () => {
    creator.updateClose();
});
