
import * as alt from 'alt';
import * as weapon from 'modules/weapon/main';
alt.onServer('giveWeapon', (args) => {
    weapon.giveWeapon(args);
});