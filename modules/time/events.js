import * as alt from 'alt';
import * as game from 'natives';
import * as prop from 'modules/prop/main'

alt.onServer("weather", (weather) => {
    game.setWeatherTypeNowPersist(weather);
});

alt.onServer("setTime", (h, m, s) => {
    game.setClockTime(h, m, s);
});