const delay = ms => new Promise(res => setTimeout(res, ms));

const headoverlay_indices = {
    "blemishes": 0,
    "facialhair" : 1,
    "eyebrows": 2
};
const component_indices = {
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
};
const facefeature_indices = {
    "nose_width" : 0,
    "nose_peak_hight" : 1,
    "nose_peak_lenght" : 2,
    "nose_bone_high" : 3,
    "nose_peak_lowering" : 4,
    "nose_bone_twist" : 5,
    "eyebrown_high" : 6,
    "eyebrown_forward" : 7,
    "cheeks_bone_high" : 8,
    "cheeks_bone_width" : 9,
    "cheeks_width" : 10,
    "eyes_opening" : 11,
    "lips_thickness" : 12,
    "jaw_bone_width" : 13,
    "jaw_bone_back_lenght" : 14,
    "chimp_bone_lowering" : 15,
    "chimp_bone_lenght" : 16,
    "chimp_bone_width" : 17,
    "chimp_hole" : 18,
    "neck_thikness" : 19,
};

const menus = [
    "head"
];

function showOneMenu(menu_id)
{
    menus.forEach((menu) => {
        if (menu == menu_id)
        {
            showMenu(menu);
        } else 
        {
            hideMenu(menu);
        }
    });
}
function showMenu(menu_id)
{
    document.querySelector('.menu#'+menu_id).style.display = 'block';
}
function hideMenu(menu_id)
{
    document.querySelector('.menu#'+menu_id).style.display = 'none';
}
function updateComponent(type,key, value)
{
    if(type == "headoverlay")
    {
        alt.emit('setHeadOverlay', headoverlay_indices[key], value);
    } else if(type == "component")
    {
        alt.emit('setSkin', component_indices[key], value);
    } else if(type == "facefeature")
    {
        alt.emit('setFaceFeature', facefeature_indices[key], value);
    }
}

async function add_colorpicker(colorpicker_id, container, el_height, elements, callback)
{
    let el_width = el_height*(443.12/512);
    
    container =  typeof(container) == "string" ? document.querySelector(container) : container;

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
    div.style.height = div_size+"px";
    
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

showOneMenu(menus[0]);