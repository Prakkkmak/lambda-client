import * as alt from 'alt';
alt.on('consoleCommand', (command, ...args) => {
    if(command == 'matrix')
    {
        if(args[0] == 'identity')
        {
            alt.log('Identity 4x4 Matrix:')
            let m = Matrix.identity(4);
            m.display();
            alt.log('Determinant: ' + m.determinant);
        } else if(args[0] == "random")
        {
            let m = Number(args[1]);
            let n = Number(args[2]);

            let cells = new Array(m).fill(0).map(x => new Array(n).fill(0).map(y => Math.floor(Math.random()*10)));

            let randomMatrix = new Matrix(cells);
            alt.log(`Random ${m}x${n} Matrix:`);
            randomMatrix.display();
            alt.log('Determinant: ' + randomMatrix.determinant);
            alt.log('Inverse: ');
            randomMatrix.inverse.display();
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

    get determinant()
    {
        let result = 0;

        if(this.m == 1)
        {
            result = this.cells[0][0];
        } else 
        {
            for(let j=0;j<this.n;j++)
            {
                let factor = this.cells[0][j];
                let subMatrix = new Matrix(new Array(this.m-1).fill(0).map(x => new Array(0)));
                
                for(let j1=0;j1<this.n;j1++)
                {
                    if(j != j1)
                    {
                        subMatrix = subMatrix.expand_right(this.extract(1, j1, this.m-1, j1));
                    }
                }
                //subMatrix.display();
                if(j%2==0)
                {
                    result += factor * subMatrix.determinant;
                } else {
                    result -= factor * subMatrix.determinant;
                }
            }
        }

        return result;
    }

    get inverse()
    { 
        //TODO: Vérifier qu'avec les inversions de ligne ça marche toujours
        if(this.determinant != 0)
        {
            let extended = this.expand_right(Matrix.identity(this.m));

            for(let j=0;j<extended.m;j++)
            {
                let pivotLine = j;

                while(extended.cells[pivotLine][j] == 0)
                {
                    pivotLine++;
                }

                if(pivotLine != j)
                {
                    extended.line_swap(pivotLine, j);
                    pivotLine = j;
                }

                extended.line_multiply(1/extended.cells[pivotLine][j], pivotLine)

                for(let i=0;i<extended.m;i++)
                {
                    if(i != j)
                    {
                        extended.line_add(pivotLine, i, -extended.cells[i][j])
                    }
                }
            }

            return extended.extract(0, extended.m, extended.m-1, extended.n-1);
        } else
        {
            throw new Error('MatrixError: this matrix do not have inverse')
        }
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

    extract(i1, j1, i2, j2)
    {
        if(!(i2-i1 < 0 || j2-j1 < 0 || i1 < 0 || j1 < 0 || i2 >= this.m || j2 >= this.n ))
        {
            let subMatrix_cells = new Array(i2-i1+1).fill(0).map(x => new Array(j2-j1+1).fill(0));
            for(let i=i1;i<=i2;i++)
            {
                for(let j=j1;j<=j2;j++)
                {
                    let ni = i - i1;
                    let nj = j - j1;

                    subMatrix_cells[ni][nj] = this.cells[i][j];
                }
            }

            return new Matrix(subMatrix_cells);
        } else {
            throw new Error('MatrixError: cannot extract a sub-matrix, check your inputs');
        }
    }

    expand_right(matrixB)
    {
        let expanded = this;

        if(expanded.m == matrixB.m)
        {
            for(let i=0;i<expanded.m;i++)
            {
                for(let jB=0;jB<matrixB.n;jB++)
                {
                    expanded.cells[i].push(matrixB.cells[i][jB]);
                }
            }

            return expanded;

        } else
        {
            throw new Error('MatrixError: cannot expand the matrix on the right, line numbers not equals')
        }

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

    line_add(l1, l2, times=1)//l1 added to l2
    {
        for(let j=0;j<this.n;j++)
        {
            this.cells[l2][j] += this.cells[l1][j] * times;
        }
    }

    line_swap(l1, l2)
    {
        let temp = this.cells[l2];
        this.cells[l2] = this.cells[l1];
        this.cells[l1] = temp;
    }

    line_multiply(factor, l)
    {
        for(let j=0;j<this.n;j++)
        {
            this.cells[l][j] *= factor;
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

export function com_rotation(alpha, beta, gamma)
{
    return rotationX(alpha).mul(rotationY(beta).mul(rotationZ(gamma)));
}

export function translation(vec)
{
    let matrix = Matrix.identity(4);

    matrix.cells[0][3] = vec.x;
    matrix.cells[1][3] = vec.y;
    matrix.cells[2][3] = vec.z;

    return matrix;
}
