const emptyPuzzle = `2001
0..0
1001
0..0`

function crosswordSolver(Puzzle,words){
    if (typeof Puzzle != "string" && Puzzle == ""){
        return "Error"
    }
    if (!Array.isArray(words) ){
        return "Error"
    }
    let Matrix = CreateMatrix(Puzzle)

    let StartIndexesWords = IndexOfFirstEmpty(Matrix);
    if(StartIndexesWords === "Error"){
        return StartIndexesWords;
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
function IndexOfFirstEmpty(matrix){
    let regex = /[^0-9.]/;
    let arr = [];
    let id = 0
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j].match(regex) != null){
                return "Error";
            }
            if(matrix[i][j] === '.' || matrix[i][j] === '0'){
                continue;
            }

            arr.push({
                Value: Number(matrix[i][j]),
                ID:++id,
                Y: i,
                X: j,
                LineY: Number(matrix[i][j]) > 1?matrix.length:1,
                LineX: matrix[i].length,
                F:() =>{
                    let arrYX = []
                    if (this.LineY != 1 && this.LineY != matrix.length){
                        if (matrix[this.Y+1][this.X] != "0"){
                            arrYX.push(false)
                        }else{
                            arrYX.push(true)
                        }
                    }else{
                        arrYX.push(false)
                    }
                    if (this.LineX != matrix.length[i]){
                        if (matrix[this.Y][this.X+1] != "0"){
                            arrYX.push(false)
                        }else{
                            arrYX.push(true)
                        }
                    }else{
                        arrYX.push(false)
                    }
                    return arrYX
                }

            });
            let tableBool = arr[arr.length-1].F()
            if(tableBool[0] == false && tableBool[1] == false){
                return "Error"
            }
        }
    }
    return arr;
}

console.log(CreateMatrix(emptyPuzzle))