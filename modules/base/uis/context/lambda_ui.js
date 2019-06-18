const delay = ms => new Promise(res => setTimeout(res, ms));

async function add_colorpicker(colorpicker_id, container, el_height, elements, callback)
{
    let el_width = el_height*(443.12/512);
    
    container = typeof(container) == "string" ? document.querySelector(container) : container;

    //calculate the width of all hexagons
    let ts = 1;
    let ls = 0;
    let s = 0;
    for(let i=0;i<elements.length;i++)
    {
        if(i==ts+ls)
        {
            ls += ts;
            s++;
            ts = 6*s;
        }
    }
    
    let div_size = el_width*(s*2+1); 

    let div = document.createElement('div');
    div.id = colorpicker_id;
    div.style.width = div_size+"px";
    div.style.height = div_size+el_height+"px";
    
    container.appendChild(div);


    let laststep_hex_number = 0;
    let hex_number = 0;
    let step = 0;
    let step_tospawn_number = 1;

    let x = div_size/2;
    let y = div_size/2;

    document.querySelector('.color-picker#'+colorpicker_id).parentElement.scrollIntoView();

    //spawn hexagon one by one in spiral clockwise
    while(hex_number < elements.length)
    {
        let i=(hex_number-laststep_hex_number);

        let svg_node = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg_node.setAttribute('width', el_width);
        svg_node.setAttribute('height', el_height);
        svg_node.setAttribute('viewBox', "0 0 9 10.392");
        
        svg_node.dataset.id = hex_number;
        svg_node.style.left = x;
        svg_node.style.top = y;
        svg_node.style.position = "absolute";
        svg_node.style.fill = elements[hex_number];
        svg_node.style.cursor = "pointer";

        let hexagon_node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        hexagon_node.setAttribute('points',"9,2.598,9,7.794,4.5,10.392,0,7.794,0,2.598,4.5,0");
        
        let svg = div.appendChild(svg_node);
        svg.appendChild(hexagon_node);
        
        if(i/step_tospawn_number >= 0 && i/step_tospawn_number < 1/6)
        {            
            x+= el_width/2;
            y+= -el_height*0.75;
        }else if(i/step_tospawn_number >= 1/6 && i/step_tospawn_number < 2/6)
        {
            x+= el_width;
            y+= 0;
        }else if(i/step_tospawn_number >= 2/6 && i/step_tospawn_number < 3/6)
        {

            x+= el_width/2;
            y+= el_height*0.75;
        }else if(i/step_tospawn_number >= 3/6 && i/step_tospawn_number < 4/6)
        {

            x+= -el_width/2;
            y+= el_height*0.75;
        }else if(i/step_tospawn_number >= 4/6 && i/step_tospawn_number < 5/6)
        {

            x+= -el_width;
            y+= 0;
        }else if(i/step_tospawn_number >= 5/6)
        {
            x+= -el_width/2;
            y+= -el_height*0.75;
        }

        svg_node.addEventListener('mouseenter', () => {
            anime({
                targets: svg_node,
                
                scale: {
                    value: 1.2,
                    duration: 200,
                    easing: 'easeInOutSine'
                }
            }); 
            svg_node.style.zIndex+=1;
        });
        svg_node.addEventListener('mouseleave', () => {
            anime({
                targets: svg_node,
                
                scale: {
                    value: 1,
                    duration: 200,
                    easing: 'easeInOutSine'
                }
            });  
            svg_node.style.zIndex-=1;
        });
        svg_node.addEventListener('click', (event) => {
            let c = eval(callback);
            c(svg_node.style.fill, svg_node.dataset.id);

            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            
            div.remove();

            event.stopPropagation();
        });

        anime.set(svg_node,{
            scale: 0.9
        });

        anime({
            targets: svg_node,
            
            scale: {
                value: 1,
                duration: 200,
                easing: 'easeInOutSine'
            }
        });      

        hex_number++;
        if(hex_number==step_tospawn_number+laststep_hex_number)
        {
            laststep_hex_number += step_tospawn_number;
            step++;
            step_tospawn_number = 6*step;

            x=-step*el_width + div_size/2;
            y=div_size/2;
        }

        await delay(1);
    }

    return div;
}



function add_input_text(parent, label)
{
    let flex_container = document.createElement('div');
    flex_container.setAttribute('class', 'flex-container');

    parent.appendChild(flex_container);
    
    let span = document.createElement('span');
    span.innerHTML = label;

    let input_text = document.createElement('input');
    input_text.setAttribute('type', 'text');

    flex_container.appendChild(span);
    flex_container.appendChild(input_text);

    input_text.addEventListener('input', (event) => {
        flex_container.dataset.cmdArg = event.target.value;
    });
}
function add_command_button(parent, label, command)
{
    let flex_container = document.createElement('div');
    flex_container.setAttribute('class', 'flex-container');

    parent.appendChild(flex_container);
    
    let button = document.createElement('button');
    button.innerHTML = label;

    flex_container.appendChild(button);

    button.addEventListener('click', (event) => {
        let cmd = command;
        let completed = true;

        for(let i=1;i<parent.childElementCount-1;i++)
        {
            let child = parent.children[i];
            if(child.dataset.cmdArg == undefined)
            {
                completed = false;
            } else if(child.dataset.cmdArg == "" || child.dataset.cmdArg.replace(/\s/g, '').length == 0)
            {
                completed = false;
            }

            cmd += " " + child.dataset.cmdArg;
        }

        if(completed)
        {
            console.log(cmd);
        } else {
            console.log('Uncomplete');
        }
    });
}
function add_header(parent, label)
{
    let flex_container = document.createElement('div');
    flex_container.setAttribute('class', 'container-header');
    flex_container.innerHTML = label;

    parent.appendChild(flex_container);
}
function create_command_menu(title, command, parameters)
{
    let menu = document.querySelector('.menu');
    add_header(menu, title);
    
    for(let i=0;i<parameters.length;i++)
    {
        if(parameters[i].type == "text")
        {
            add_input_text(menu, parameters[i].label);
        }
    }

    add_command_button(menu, 'Exécuter', command);
}

// window.addEventListener('load', () => {
//     create_command_menu('Commande', '/test', [
//         {
//             type: 'text',
//             label: 'Argument 1'
//         },
//         {
//             type: 'text',
//             label: 'Argument 2'
//         },
//         {
//             type: 'text',
//             label: 'Argument 3'
//         }
//     ])
// });
