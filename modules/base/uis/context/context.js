const d = 200;

function move_to(element, originX, originY, angle, offsetFactor, distance, time)
{
    anime.set(element, {

        left: originX + (Math.cos(angle) * distance) * offsetFactor + 'px',
        bottom: originY + (Math.sin(angle) * distance) * offsetFactor + 'px'
    });

    anime({
        targets: element,

        left: originX + (Math.cos(angle) * distance) + 'px',
        bottom: originY + (Math.sin(angle) * distance) + 'px',
        
        easing: 'easeInOutSine',
        duration: time
    })
}

function fade_in(time)
{
    let container = document.querySelector('.wrapper');
    
    //alt.emit('blurin')

    anime({
        targets: container,
        backgroundColor: 'rgba(0,0,0,0.35)',

        easing: 'easeInOutSine', 
        duration: time
    });
}

function fade_out(time)
{
    let container = document.querySelector('.wrapper');
    
    //alt.emit('blurout')

    anime({
        targets: container,
        backgroundColor: 'rgba(0,0,0,0)',

        easing: 'easeInOutSine', 
        duration: time
    });
}



/** 
*   Ajoute un bouton.
*   
*   @param {string} query       Requête pour choisir le conteneur
*   @param {string} label       Nom du bouton
*   @param {Function} action        Action du bouton
*/
function add_button(originX,originY, angle, distance, label = "Button", action = (...args) => { console.log(args)})
{


    let button = document.createElement('button');
    button.setAttribute('class', 'button');
    button.addEventListener('click', action);

    button.addEventListener('mouseenter', () => {
        anime({
            targets: button,

            scale: 1.2,
            
            easing: 'easeInOutSine',
            duration: 100
        });
    });

    button.addEventListener('mouseleave', () => {
        anime({
            targets: button,

            scale: 1,
            
            easing: 'easeInOutSine',
            duration: 100
        });
    });

    let button_text = document.createElement('span');
    button_text.innerHTML = label;
    button_text.setAttribute('class', 'button-text');
    button_text.style.left = Math.cos(angle)*65-140 + 'px';
    button_text.style.bottom = Math.sin(angle)*60-5 + 'px';
    button_text.style.width = 300 +'px';
    button.appendChild(button_text);

    let container = document.querySelector('.wrapper');
    container.appendChild(button);

    return button;
}
/** 
*   Supprime tous les boutons
*   
*   @param {string} query       Requête pour choisir le conteneur contenant les bouton à supprimer
*/
function clear_buttons(query)
{
    var selected = document.querySelector(query);
    while (selected.firstChild) {
        selected.removeChild(selected.firstChild);
    }
}
/** 
*   Convertie un JSON compatible et fait apparaître les boutons contenus.
*   
*   @param {string} json        Texte JSON contenant la structure des boutons 
*/
function button_parser(json)
{
    clear_buttons('.wrapper');

    data = JSON.parse(json);
    let n = data.length;

    for (var i=0;i<n;i++)
    {
        let lbl = data[i].label;
        let cmd = data[i].cmd;
        
        let a = i * (2 * Math.PI / n) + Math.PI/2;

        let b;

        if (data[i].children.length > 0)
        {

            let sub_json = JSON.stringify(data[i].children);
            let sub = data[i];

            if(sub.children[0].type == undefined)
            {
                b = add_button(window.innerWidth/2, window.innerHeight/2, a, d, lbl, () => {
                    button_parser(sub_json);
                });
            } else if(sub.children[0].type == 'menu_args'){
                b = add_button(window.innerWidth/2, window.innerHeight/2, a, d, lbl, () => {
                    let parameters = [];
                    for(let j=0;j<sub.children[0].children.length;j++)
                    {
                        parameters.push({
                            type: sub.children[0].children[j].type,
                            label: sub.children[0].children[j].label
                        });
                    }
                    document.querySelector('.container').style.display = 'block';
                    create_command_menu(sub.children[0].label, sub.cmd, parameters);
                });
            }
            

        } else 
        {   
            b = add_button(window.innerWidth/2, window.innerHeight/2, a, d, lbl, () => {
                fade_out(200);
                alt.emit('chatmessage', null, cmd);
                alt.emit('hide');
                clear_buttons('.wrapper');
            });
            
        }

        move_to(b, window.innerWidth/2, window.innerHeight/2, a, 0.15, d, 200);

    }

    console.log(document.querySelector('.wrapper').childElementCount);
}


window.addEventListener('load', () =>{
    // let test = [{
    //     label: 'Test 1',
    //     cmd: '/test',
    //     children: [{
    //         label: 'Commande',
    //         type: 'menu_args',
    //         children: [
    //             {
    //                 type: 'text',
    //                 label: 'Argument 1'
    //             },
    //             {
    //                 type: 'text',
    //                 label: 'Argument 2'
    //             }
    //         ]
    //     }]
    // }];

    // button_parser(JSON.stringify(test));
    alt.emit('onLoad', null);
});
alt.on('onParse', (json) => {
    console.log('WEB: ' + json);
    fade_in(200);
    button_parser(json);
});


