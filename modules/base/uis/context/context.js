alt.on('onParse', (json) => {
    button_parser(json);
});


/** 
*   Ajoute un bouton.
*   
*   @param {string} query       Requête pour choisir le conteneur
*   @param {string} label       Nom du bouton
*   @param {Function} action        Action du bouton
*/
function add_button(query = ".wrapper", label = "Button", action = (...args) => { console.log(args)})
{
    var context = document.querySelector(query);
    var button = document.createElement("button");

    button.setAttribute("class", "button");
    button.innerHTML = label;

    context.appendChild(button);
    button.addEventListener("click", function()
    {
       action();
    }); //Action

    button.addEventListener("click", function()
    {
        anime.set(button,{
            scale: 0.95
        });

        anime({
            targets: button,
            
            scale: {
                value: 1,
                duration: 200,
                easing: 'easeInOutSine'
            }
        });      
    }); //Animation
    
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

    for (var i=0;i<data.length;i++)
    {
        let lbl = data[i].label;
        let cmd = data[i].cmd;
        
        if (data[i].children.length > 0)
        {
            let sub_json = JSON.stringify(data[i].children);
            add_button('.wrapper', lbl, () => {
                button_parser(sub_json);
            });  
        } else 
        {
            add_button('.wrapper', lbl, () => {
                alt.emit('chatmessage', null, cmd);
                alt.emit('hide');
                clear_buttons('.wrapper');
            }); 
        }
    }
}

window.addEventListener('load', () =>{
    //Evènement appelé quand la page est chargée
    alt.emit('onLoad');
});

