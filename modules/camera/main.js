import game from 'natives';
import alt from 'alt';

export const ped_bones =
{
    'IK_Head': 0x322c,
    'SKEL_Head ': 0x796E,
    'FACIAL_facialRoot': 0xFE2C,
    'SKEL_Spine2': 0x60f1,
    'SKEL_Root': 0x0
};

var cam = null;

export function createCam(position, rotation, fov) {
    alt.nextTick(() => {
        cam = game.createCam('DEFAULT_SCRIPTED_CAMERA', false);
        game.setCamCoord(cam, position.x, position.y, position.z);
        game.setCamRot(cam, rotation.x, rotation.y, rotation.z);
        game.setCamActive(cam, true);
        game.setCamFov(cam, fov);
    });

    return cam;
}
export function focusOnBone(bone, offset, fov, easeTime) {
    bone = (typeof (bone) == 'string') ? ped_bones[bone] : bone;
    if (cam == null) {
        createCam({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, fov);
        alt.nextTick(() => {
            game.attachCamToPedBone(cam, alt.getLocalPlayer().scriptID, bone, offset.x, offset.y, offset.z, true);
            game.pointCamAtPedBone(cam, alt.getLocalPlayer().scriptID, bone, 0, 0, 0, true);
            game.renderScriptCams(true, true, easeTime, true, false);
        });
    } else {
        alt.nextTick(() => {
            game.setCamActive(cam, true);
            game.renderScriptCams(true, true, easeTime, true, false);
            game.setCamFov(cam, fov);
            game.attachCamToPedBone(cam, alt.getLocalPlayer().scriptID, bone, offset.x, offset.y, offset.z, true);
            game.pointCamAtPedBone(cam, alt.getLocalPlayer().scriptID, bone, 0, 0, 0, true);
        });
    }
}
export function goBackToGameplayCam() {

    alt.nextTick(() => {

        game.setCamActive(cam, false);
        game.destroyAllCams(false);
        cam = null;
        game.renderScriptCams(false, false, 0, true, true);
    });

}