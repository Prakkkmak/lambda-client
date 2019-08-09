import * as alt from 'alt';
import * as quest from 'modules/quest/main'

alt.on('update', () => {
    quest.update();
});
alt.onServer('startQuest', (pos, text) => {
    alt.log("startQuest lancé");
    alt.log("Quete : " + text)
    quest.startQuest(pos, text);
});

alt.onServer('stopQuest', () => {
    quest.completeQuest();
});
