import * as alt from 'alt';
import * as prop from 'modules/prop/main'
alt.onServer('placeProp', (propName) => {
    alt.log("triggered");
    prop.spawnProp(propName, alt.getLocalPlayer().pos.x, alt.getLocalPlayer().pos.y, alt.getLocalPlayer().pos.z);
});

