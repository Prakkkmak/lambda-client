import * as alt from 'alt';
alt.on('consoleCommand', (command, ...args) => {
    if(command == 'matrix')
    {
        if(args[0] == 'identity')
        {
            if(args[1] == 'display')
            {
                Matrix.identity(4).display();
            }
        }
    }
});


export class Matrix
{

    constructor(cells)
    {
        this.cells = cells;

        //this.display();
    }

    static identity(n)
    {
        let cells = new Array(n).fill(0).map(x => Array(n).fill(0));

        for(let i=0;i<n;i++)
        {
            cells[i][i] = 1;
        }

        return new Matrix(cells);
    }

    get m()
    {
        return this.cells.length;
    }

    get n()
    {
        return this.cells[0].length;
    }

    mul(matrixB)
    {
        // TODO: verifs taille
        let cells = new Array(this.m).fill(0).map(x => Array(matrixB.n).fill(0));

        for(let i=0;i<this.m;i++)
        {
            for(let j=0;j<matrixB.n;j++)
            {
                let cell = 0;

                for(let a=0;a<this.n;a++)
                {
                    cell += this.cells[i][a] * matrixB.cells[a][j];
                }

                cells[i][j] = cell;
            }
        }

        return new Matrix(cells);
    }

    display()
    {
        for(let i=0;i<this.m;i++)
        {
            let line = "";
            
            for(let j=0;j<this.n;j++)
            {
                line += this.cells[i][j] + " ";
            }

            alt.log(line);
            alt.log(" ");
        }
    }
}

export function rotationX(alpha)
{
    let matrix = Matrix.identity(4);

    matrix.cells[1][1] = Math.cos(alpha);
    matrix.cells[1][2] = -Math.sin(alpha);
    matrix.cells[2][1] = Math.sin(alpha);
    matrix.cells[2][2] = Math.cos(alpha);

    return matrix;
}

export function rotationY(beta)
{
    let matrix = Matrix.identity(4);

    matrix.cells[0][0] = Math.cos(beta);
    matrix.cells[2][0] = -Math.sin(beta);
    matrix.cells[0][2] = Math.sin(beta);
    matrix.cells[2][2] = Math.cos(beta);

    return matrix;
}

export function rotationZ(gamma)
{
    let matrix = Matrix.identity(4);

    matrix.cells[0][0] = Math.cos(gamma);
    matrix.cells[0][1] = -Math.sin(gamma);
    matrix.cells[1][0] = Math.sin(gamma);
    matrix.cells[1][1] = Math.cos(gamma);

    return matrix;
}

export function rotation(alpha, beta, gamma)
{
    return rotationZ(gamma).mul(rotationY(beta).mul(rotationX(alpha)));
}

export function translation(vec)
{
    let matrix = Matrix.identity(4);

    matrix.cells[0][3] = vec.x;
    matrix.cells[1][3] = vec.y;
    matrix.cells[2][3] = vec.z;

    return matrix;
}
