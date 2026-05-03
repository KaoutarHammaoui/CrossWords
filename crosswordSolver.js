const emptyPuzzle = `2001
0..0
1000
0..0`

function crosswordSolver(Puzzle,words){
    if (typeof Puzzle != "string" || Puzzle == ""){
        return "Error"
    }
    if (!Array.isArray(words) ){
        return "Error"
    }
    let Matrix = CreateMatrix(Puzzle)

    let StartIndexesWords = IndexOfFirstEmpty(Matrix);
    if(StartIndexesWords === "Error"){
        return StartIndexesWords +" 1";
    }
    let res = CreateMatrixFromWords(Matrix,StartIndexesWords, words);
    if (res === "Error"){
        return res;
    }
    res = res.map((row) => row.join('')).join('\n');
    return res;
}

function CreateMatrix(puzzle){
    return puzzle.split('\n').map(ele => [...ele]);
}
function CreateMatrixFromWords(Matrix,StartIndexesWords, words){
}

const F = (Y, X, matrix) => {
    let arrYX = []

    let vertical = (Y === 0 || matrix[Y - 1][X] === ".") && (Y + 1 < matrix.length && matrix[Y + 1][X] !== ".")

    let horizontal = (X === 0 || matrix[Y][X - 1] === ".") && (X + 1 < matrix[Y].length && matrix[Y][X + 1] !== ".")

    arrYX.push(vertical)
    arrYX.push(horizontal)

    return arrYX
}
function test(){

}
function IndexOfFirstEmpty(matrix){
    let matrixLength = matrix[0].length
    let regex = /[^0-9.]/
    let arr = []
    let id = 0

    for(let i = 0; i < matrix.length; i++){
        if (matrix[i].length !== matrixLength){
            return "Error"
        }
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j].match(regex) !== null){
                            console.log(2);

                return "Error"
            }

            if(matrix[i][j] === "." || matrix[i][j] === "0"){
                continue
            }

            let tableBool = F(i, j, matrix)
            let countStarts = tableBool.filter((value) => value === true).length
            if (Number(matrix[i][j]) !== countStarts) {
                return "Error"
            }

            arr.push({
                Value: Number(matrix[i][j]),
                ID: ++id,
                Y: i,
                X: j,
                Vertical: tableBool[0],
                Horizontal: tableBool[1]
            })
        }
    }

    return arr
}

const words = ['casa', 'alan', 'ciao', 'anta']
console.log(crosswordSolver(emptyPuzzle,words))