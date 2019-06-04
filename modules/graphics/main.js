import game from 'natives';
import alt from 'alt';

const screen_effects = [
    'SwitchHUDIn',
    'SwitchHUDOut',
    'FocusIn',
    'FocusOut',
    'MinigameEndNeutral',
    'MinigameEndTrevor',
    'MinigameEndFranklin',
    'MinigameEndMichael',
    
    'MinigameTransitionOut',
    'MinigameTransitionIn',
    'SwitchShortNeutralIn',
    'SwitchShortFranklinIn',
    'SwitchShortTrevorIn',
    'SwitchShortMichaelIn',
    'SwitchOpenMichaelIn',
    'SwitchOpenFranklinIn',
    'SwitchOpenTrevorIn',
    'SwitchHUDMichaelOut',
    'SwitchHUDFranklinOut',
    'SwitchHUDTrevorOut',

    'SwitchShortFranklinMid',
    'SwitchShortMichaelMid',
    'SwitchShortTrevorMid',
    'DeathFailOut',
    'CamPushInNeutral',
    'CamPushInFranklin',
    'CamPushInMichael',
    'CamPushInTrevor',
    'SwitchOpenMichaelIn',
    'SwitchSceneFranklin',
    'SwitchSceneTrevor',
    'SwitchSceneMichael',
    'SwitchSceneNeutral',
    
    'MP_Celeb_Win',
    'MP_Celeb_Win_Out',
    'MP_Celeb_Lose',
    'MP_Celeb_Lose_Out',
    'DeathFailNeutralIn',
    'DeathFailMPDark',
    'DeathFailMPIn',
    'MP_Celeb_Preload_Fade',
    'PeyoteEndOut',
    'PeyoteEndIn',
    'PeyoteIn',
    'PeyoteOut',
    'MP_race_crash',
    'SuccessFranklin',
    'SuccessTrevor',
    'SuccessMichael',
    'DrugsMichaelAliensFightIn',
    'DrugsMichaelAliensFight',
    'DrugsMichaelAliensFightOut',
    'DrugsTrevorClownsFightIn',
    'DrugsTrevorClownsFight',
    'DrugsTrevorClownsFightOut',

    'HeistCelebPass',
    'HeistCelebPassBW',
    'HeistCelebEnd',
    'HeistCelebToast',
    'MenuMGHeistIn',
    'MenuMGTournamentIn',
    'MenuMGSelectionIn',
    
    'ChopVision',
    'DMT_flight_intro',
    'DMT_flight',
    'DrugsDrivingIn',
    'DrugsDrivingOut',
    
    'SwitchOpenNeutralFIB5',
    'HeistLocate',
    'MP_job_load',
    'RaceTurbo',
    'MP_intro_logo',
    'HeistTripSkipFade',
    'MenuMGHeistOut',
    'MP_corona_switch',
    'MenuMGSelectionTint',
    'SuccessNeutral',
    'ExplosionJosh3',
    'SniperOverlay',
    'RampageOut',
    'Rampage',
    'Dont_tazeme_bro',
    'DeathFailOut'
];

let chosen = -1;

export function startScreenEffect(effectName, duration, looped)
{
    game.startScreenEffect(effectName, duration, looped);
}
export function stopScreenEffect(effectName)
{
    game.stopScreenEffect(effectName);
}
export function stopAllScreenEffects()
{
    game.stopAllScreenEffects();
}

export function setShakeCam(shakeName, intensity)
{
    game.shakeGameplayCam(shakeName, intensity);
}
export function setShakeCamAmplitude(amplitude)
{
    game.setGameplayCamShakeAmplitude(amplitude);
}
export function stopShake()
{
    game.stopGameplayCamShaking();
}

export function nextEffect()
{
    //stopAllScreenEffects();
    if(chosen+1 >= screen_effects.length)
    {
        chosen = 0;
    } else
    {
        chosen += 1;
    }

    startScreenEffect(screen_effects[chosen], 0, true);
    alt.log(screen_effects[chosen]);
}