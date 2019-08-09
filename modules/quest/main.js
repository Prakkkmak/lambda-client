import * as alt from 'alt';
import * as position_utils from 'modules/utils/position'
import * as game from 'natives';

let markerPosition;
let questText;
let dateFinish;
let questBlip;
export function startQuest(position, text) {
    markerPosition = position; 
    questText = text;
    if(markerPosition.x != 0 && markerPosition.y != 0 && markerPosition.z != 0) {
        questBlip = game.addBlipForCoord(markerPosition.x,markerPosition.y,markerPosition.z)
        game.setBlipColour(questBlip, 33); // 33 = yellow
    }
}

export function checkQuest(){
    completeQuest();
}

export function completeQuest(){
    //let view = new alt.WebView("http://resources/lambda-client/modules/quest/cef/index.html") 
    //view.destroy();
    //view.execJs("main.js");
    markerPosition = null;
    questText = null;
    dateFinish = new Date().getTime();
    if(questBlip != null) game.removeBlip(questBlip);
    questBlip = null;
    alt.emitServer('questComplete');
    
}

export function drawText(text){
    game.setTextScale(0.45,0.45);
    game.setTextColour(255,255,255,255);
    game.setTextWrap(0,1);
    game.setTextCentre(true);
    game.setTextDropShadow(5,0,0,0,100);
    game.setTextOutline();
    game.setTextEdge(0,0,0,0,255);
    game.beginTextCommandDisplayText("STRING");
    game.addTextComponentSubstringPlayerName(questText);
    game.endTextCommandDisplayText(0.5, 0.95);
}
export function drawVictoryText(){
    let now = new Date().getTime();
    let shade = (now - dateFinish) / 3;
    shade = Math.floor(shade);
    if(shade > 255) shade = 255 - shade + 255;
    if(shade < 0) {
        dateFinish = null;
        shade = 0;
    }
    game.setTextScale(2.5,2.5);
    game.setTextFont(7);
    game.setTextColour(255,255,255,shade);
    game.setTextWrap(0,1);
    game.setTextCentre(true);
    game.setTextDropShadow(40,0,0,0,255);
    game.setTextOutline();
    game.setTextEdge(5,0,0,0,255);
    game.beginTextCommandDisplayText("STRING");
    game.addTextComponentSubstringPlayerName("~y~MISSION PASSED! ~n~~w~ RESPECT+");

    game.endTextCommandDisplayText(0.5, 0.3);
}

export function update(){
    if(markerPosition != null){
        let pos = alt.Player.local.pos;
        if(markerPosition.x != 0 && markerPosition.y != 0 && markerPosition.z != 0) {
            game.drawMarker(1, markerPosition.x, markerPosition.y, markerPosition.z - 0.7, 0, 0, 0, 0, 0, 0, 1.5, 1.5, 1.5, 200, 180, 30, 100, 1, 1, 2, 0, 0, 0, 0);

        }
            
        drawText();
        if(position_utils.distance(markerPosition, alt.Player.local.pos) < 2){
            checkQuest();                                                                     
        }
    }
    if(dateFinish != null){
        drawVictoryText();
    }
    
}