import * as alt from 'alt';
import * as base from "modules/base/main"
import * as skin from "modules/skin/main"
import * as cef from 'modules/cef/main';

alt.onServer('setFreeze', (value) => {
    base.freeze(value);
});

alt.onServer('playerLoaded', () => {
    skin.setHeadBlendData(0, 0, 0, 0, 0.5, 0.5);
});

alt.onServer('setContextActions', (json) => {
    if(JSON.parse(json).length > 0)
    {
        base.openContext(() => {
            alt.log('onParse Send');
            
            alt.setTimeout(() => {
                let test = [
                    {
                        label: 'On teste',
                        cmd: '/veh',
                        children: [
                            {
                                label: 'Bon bah on teste encore',
                                cmd: '/spec stop',
                                children: [
                                    {
                                        label: 'Encore ?',
                                        cmd: '/oui',
                                        children: []
                                    },
                                    {
                                        label: 'Bon va te coucher...',
                                        cmd: '/veh',
                                        children: []
                                    },
                                    
                                    {
                                        label: 'Mais mec',
                                        cmd: '/veh',
                                        children: []
                                    },
                                    {
                                        label: 'Encore ?',
                                        cmd: '/oui',
                                        children: []
                                    },
                                    {
                                        label: 'Bon va te coucher...',
                                        cmd: '/veh',
                                        children: []
                                    },
                                    
                                    {
                                        label: 'Mais mec',
                                        cmd: '/veh',
                                        children: []
                                    },
                                    {
                                        label: 'Encore ?',
                                        cmd: '/oui',
                                        children: []
                                    },
                                    {
                                        label: 'Bon va te coucher...',
                                        cmd: '/veh',
                                        children: []
                                    },
                                    
                                    {
                                        label: 'Mais mec',
                                        cmd: '/veh',
                                        children: []
                                    },
                                    {
                                        label: 'Encore ?',
                                        cmd: '/oui',
                                        children: []
                                    },
                                    {
                                        label: 'Bon va te coucher...',
                                        cmd: '/veh',
                                        children: []
                                    },
                                    
                                    {
                                        label: 'Mais mec',
                                        cmd: '/veh',
                                        children: []
                                    }
            
                                ]
            
                            },
                            {
                                label: 'Enfin comme tu veux...',
                                cmd: '/spec stop',
                                children: [
                                    {
                                        label: 'Abuse pas',
                                        cmd: '/oui',
                                        children: []
                                    }
                                ]
            
                            }
                        ]
                    }
                ];
            
            
                cef.getView('context').view.emit('onParse', JSON.stringify(test)); 
            }, 200);
            //cef.getView('context').view.execJS(`button_parser('${json}')`)
            alt.log('onParse Sent');
        });
    }
    
    
    alt.log(json);
});

alt.onServer('setInteraction', (a,b,c,d) => {
    base.openInteraction(() => {
        cef.getView('interaction').view.emit('onInteraction', a,b,c,d);
    });
});