const emptyPuzzle = `
2001
0..0
1000
0..0`

function crosswordSolver(Puzzle,words){
    let Matrix = CreateMatrix(Puzzle)
    let StartIndexesWords = IndexOfFirstEmpty(Matrix);
    if(typeof StartIndexesWords === "string"){
        return StartIndexesWords;
    }
    let res = CreateMatrixFromWords(Matrix,StartIndexesWords, words);
    if (typeof res === "string"){
        return res;
    }
    res = res.map((row) => row.join('')).join('\n');
    return res;
}

function CreateMatrix(puzzle){
    puzzle = puzzle.split('\n');
    let matrix = [];
    for(let i = 0; i < puzzle.length; i++){
        matrix.push(puzzle[i].split(''));
    }
    return matrix;
}
function CreateMatrixFromWords(Matrix,StartIndexesWords, words){
}
function IndexOfFirstEmpty(matrix){
    let regex = /[^0-9.]/;
    let arr = [];
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j].match(regex) != null){
                return "error: invalid character in puzzle";
            } 
            if(matrix[i][j] === '.' || matrix[i][j] === '0'){
                continue;
            } 
            
            arr.push({
                Value: Number(matrix[i][j]),
                Y: i,
                X: j,
                LineY: matrix.length,
                LineX: matrix[i].length
            });
        }
    }
    return arr;
}