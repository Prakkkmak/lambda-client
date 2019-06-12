import * as alt from 'alt';
import * as game from 'natives';

const MAX_SHADOWS = 200;

var lights = [];

class Light
{
    constructor(id, position, color, shadow = true, active = true)
    {
        this.id = id;
        this.position = position;
        this.color = color;
        this.shadow = shadow;
        this.active = active;
        
        lights.push(this);
    }

    setInactive()
    {
        this.active = false;
    }
    setActive()
    {
        this.active = true;
    }
    setShadowsActive()
    {
        this.shadow = true;
    }
    setShadowsInactive()
    {
        this.shadow = false;
    }

    attachToEntity(entity, offset)
    {
        this.entity = entity;
        this.offsetAttach = offset;
    }

    render()
    {
        if(this.entity != undefined)
        {
            let entityCoords = game.getEntityCoords(this.entity, false);

            this.position.x = entityCoords.x + this.offsetAttach.x;
            this.position.y = entityCoords.y + this.offsetAttach.y;
            this.position.z = entityCoords.z + this.offsetAttach.z;
        }
    }
}

export class PointLight extends Light
{
    constructor(id, position, color, range, intensity, shadow = true, active = true)
    {
        super(id, position, color, shadow);
        this.active = active;
        this.range = range;
        this.intensity = intensity;

        alt.log('Creating ' + id);
    }

    render()
    {
        super.render();
        if(this.shadow)
        {
            if(this.shadowID == undefined)
            {
                this.shadowID = getFirstFreeShadowID();
            }

            game.drawLightWithRangeAndShadow(this.position.x, this.position.y, this.position.z, this.color.r, this.color.g, this.color.b, this.range, this.intensity, this.shadowID);
        } else 
        {
            game.drawLightWithRange(this.position.x, this.position.y, this.position.z, this.color.r, this.color.g, this.color.b, this.range, this.intensity);
        }
        
    }
}
                                          
export class SpotLight extends Light
{
    constructor(id, position, direction, color, distance, brightness, roundness, radius, falloff, shadow = true, active = true)
    {
        super(id, position, color, shadow);
        this.active = active;
        this.direction = direction;
        this.distance = distance;
        this.brightness = brightness;
        this.roundness = roundness;
        this.radius = radius;
        this.falloff = falloff;
    }

    render()
    {
        super.render();


        if(this.shadow)
        {
            if(this.shadowID == undefined)
            {
                this.shadowID = getFirstFreeShadowID();
            }

            if(this.pointEntity != undefined)
            {
                let entityPos = game.getEntityCoords(this.pointEntity, false);

                let pointDir = {
                    x: entityPos.x - this.position.x,
                    y: entityPos.y - this.position.y,
                    z: entityPos.z - this.position.z
                }

                game.drawSpotLightWithShadow(this.position.x, this.position.y, this.position.z, pointDir.x, pointDir.y, pointDir.z, this.color.r, this.color.g, this.color.b, this.distance, this.brightness, this.roundness, this.radius, this.falloff, this.shadowID);
            } else 
            {
                game.drawSpotLightWithShadow(this.position.x, this.position.y, this.position.z, this.direction.x, this.direction.y, this.direction.z, this.color.r, this.color.g, this.color.b, this.distance, this.brightness, this.roundness, this.radius, this.falloff, this.shadowID);
            }
        } else 
        {
            if(this.pointEntity != undefined)
            {
                let entityPos = game.getEntityCoords(this.pointEntity, false);

                let pointDir = {
                    x: entityPos.x - this.position.x + this.offsetPointAt.x,
                    y: entityPos.y - this.position.y + this.offsetPointAt.y,
                    z: entityPos.z - this.position.z + this.offsetPointAt.z
                }

                game.drawSpotLight(this.position.x, this.position.y, this.position.z, pointDir.x, pointDir.y, pointDir.z, this.color.r, this.color.g, this.color.b, this.distance, this.brightness, this.roundness, this.radius, this.falloff);
            } else 
            {
                game.drawSpotLightWithShadow(this.position.x, this.position.y, this.position.z, this.direction.x, this.direction.y, this.direction.z, this.color.r, this.color.g, this.color.b, this.distance, this.brightness, this.roundness, this.radius, this.falloff, this.shadowID);
            }
        }
        
    }

    pointAtEntity(entity, offset)
    {
        this.pointEntity = entity;
        this.offsetPointAt = offset;
    }
}

export function getFirstFreeShadowID()
{
    for(let i=0;i<MAX_SHADOWS;i++)
    {
        let taken = false;
        for(let l=0;l<lights.length;l++)
        {
            if(lights[l].shadowID == i)
            {
                taken = true;
            }
        }

        if(!taken)
        {
            
            return i+4420;
        }
    }
}
export function updateLights()
{
    for(let i=0;i<lights.length;i++)
    {
        if(lights[i].active) lights[i].render();
    }
}

export function getLight(id)
{
    for(let i=0;i<lights.length;i++)
    {
        if(lights[i].id == id)
        {
            return lights[i];
        }
    }

    return undefined;
}
export function clearLights()
{
    lights = [];
}

alt.on('update', () => {
    updateLights();
});