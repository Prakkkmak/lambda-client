import alt from 'alt';
import * as cef from 'modules/cef/main';

alt.onServer('openCef', (view) => {
    cef.getView(view).open();
});

alt.onServer('closeCef', (view) => {
    cef.getView(view).close();
});

