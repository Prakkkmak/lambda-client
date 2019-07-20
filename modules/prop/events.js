import * as alt from 'alt';
import * as prop from 'modules/prop/main'
alt.onServer('placeProp', (propName) => {
    alt.log("triggered");
    prop.spawnProp(propName, alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z);
});

