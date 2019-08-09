import * as alt from 'alt';
import * as prop from 'modules/prop/main'
alt.onServer('syncProp', (propIdentity, propName, propPosition, propRotation) => {
    prop.spawnProp(propIdentity,propName, propPosition, propRotation);
});

