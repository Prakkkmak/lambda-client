import * as alt from 'alt';
import * as interior from "modules/interior/main";

alt.onServer('loadIpl', (ipl) => {
    interior.loadIpl(ipl);
});
alt.onServer('unloadIpl', (ipl) => {
    interior.unLoadIpl(ipl);
});