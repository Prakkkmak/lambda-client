indices = {
    "face": 0,
    "mask": 1,
    "hair": 2,
    "torso": 3,
    "legs": 4,
    "bags": 5,
    "foot": 6,
    "accessories": 7,
    "undershirt": 8,
    "bodyarmor": 9,
    "decals": 10,
    "tops": 11
}
components = {
    "face": {            "drawable": 0,            "texture": 0,            "palette": 0        },
    "mask": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "hair": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "torso": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "legs": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "bags": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "foot": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "accessories": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "undershirt": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "bodyarmor": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "decals": {             "drawable": 0,             "texture": 0,             "palette": 0         },
    "tops": {             "drawable": 0,             "texture": 0,             "palette": 0         }
}


/** 
*   Ajoute un bouton.
*   
*   @param {string} target_query       Requête pour choisir le conteneur
*   @param {string} label       Nom du bouton
*   @param {Function} actionleft        Action du bouton de gauche
*   @param {Function} actionright        Action du bouton de droite
*/
function add_choosebuttons(actionleft, actionright, target_query = ".wrapper", label = "Button", style="primary", id=undefined)
{
    var context = document.querySelector(target_query);

    var button_left = document.createElement("button");
    var button_right = document.createElement("button");
    var div_middle = document.createElement("div");

    button_left.setAttribute("class", style + " left");
    if (typeof id !== undefined) button_left.setAttribute("id", id);

    button_right.setAttribute("class", style + " right");
    if (typeof id !== undefined) button_right.setAttribute("id", id);

    div_middle.setAttribute("class", style + " middle");

    context.appendChild(button_left);
    context.appendChild(div_middle);
    context.appendChild(button_right);

    div_middle.innerHTML = label;
    
    button_left.addEventListener("click", function()
    {
       actionleft();
    }); //Action
    button_right.addEventListener("click", function()
    {
       actionright();
    }); //Action
}
function init_choosebuttons(struct_dict, target_query = ".wrapper")
{

    Object.keys(struct_dict).forEach( (key) => {
        let i=0;
        Object.keys(struct_dict[key]).forEach( (attribute) => {
            if(i==0)
            {
                add_choosebuttons( () => 
                {
                    update_skin_component(key, "precedent");

                }, () => {
                    update_skin_component(key, "suivant");

                } ,".wrapper", key, "primary", key);
            } else
            {
                add_choosebuttons( () => {
                    //update_skin_component(key, direction);

                }, () => {
                    //update_skin_component(key, direction);

                } ,".wrapper" , attribute, "secondary", key);
            }
            i++;
        });
    });

    
}
// function add_value_component(key, attribute, value)
// {
//     components[key][attribute] = components[key][attribute]+value;
//     update_skin_component(key);
// }
// function set_value_component(key, attribute, value)
// {
//     components[key][attribute] = value;
//     update_skin_component(key);
// }
function update_skin_component(key, direction)
{
    alt.emit('skinchange', direction + " " + indices[key]);
}


window.addEventListener('load', () => {
    init_choosebuttons(components);
});