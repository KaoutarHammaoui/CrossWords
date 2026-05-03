const emptyPuzzle = `2001
0..0
1000
0..0`;

function crosswordSolver(Puzzle, words) {
  if (typeof Puzzle != "string" || Puzzle == "") {
    return "Error";
  }
  if (!Array.isArray(words)) {
    return "Error";
  }
  let Matrix = CreateMatrix(Puzzle);

  let StartIndexesWords = IndexOfFirstEmpty(Matrix);
  if (StartIndexesWords === "Error") {
    return StartIndexesWords + " 1";
  }
  let res = CreateMatrixFromWords(Matrix, StartIndexesWords, words);
  if (res === "Error") {
    return res;
  }
  res = res.map((row) => row.join("")).join("\n");
  return res;
}

function CreateMatrix(puzzle) {
  return puzzle.split("\n").map((ele) => [...ele]);
}

function CreateMatrixFromWords(Matrix, StartIndexesWords, words) {}

const F = (Y, X, matrix) => {
  let arrYX = [];

  let vertical =
    (Y === 0 || matrix[Y - 1][X] === ".") &&
    Y + 1 < matrix.length &&
    matrix[Y + 1][X] !== ".";

  let horizontal =
    (X === 0 || matrix[Y][X - 1] === ".") &&
    X + 1 < matrix[Y].length &&
    matrix[Y][X + 1] !== ".";

  arrYX.push(vertical);
  arrYX.push(horizontal);

  return arrYX;
};

// function test() {}

function IndexOfFirstEmpty(matrix) {
  let matrixLength = matrix[0].length;
  let regex = /[^0-9.]/;
  let arr = [];
  let id = 0;

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].length !== matrixLength) {
      return "Error";
    }
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].match(regex) !== null) {
        console.log(2);

        return "Error";
      }

      if (matrix[i][j] === "." || matrix[i][j] === "0") {
        continue;
      }

      let tableBool = F(i, j, matrix);
      let countStarts = tableBool.filter((value) => value === true).length;
      if (Number(matrix[i][j]) !== countStarts) {
        return "Error";
      }

      arr.push({
        Value: Number(matrix[i][j]),
        ID: ++id,
        Y: i,
        X: j,
        Vertical: tableBool[0],
        Horizontal: tableBool[1],
      });
    }
  }

  return arr;
}

//guys these functions are for placing wordds into the matrix
function getWordLength(matrix, Y, X, direction) {
  let length = 0;
  if (direction === "horizontal") {
    while (X < matrix[Y].length && matrix[Y][X] !== ".") {
      length++;
      X++;
    }
  } else {
    while (Y < matrix.length && matrix[Y][X] !== ".") {
      length++;
      Y++;
    }
  }
  return length;
}

function placeWord(matrix, Y, X, word, direction) {
  let backup = [];
  for (let i = 0; i < word.length; i++) {
    let cy = direction === "vertical" ? Y + i : Y;
    let cx = direction === "horizontal" ? X + i : X;
    backup.push(matrix[cy][cx]);
    if (matrix[cy][cx] !== "0" && matrix[cy][cx] !== word[i]) {
      for (let k = 0; k < backup.length; k++) {
        let ky = direction === "vertical" ? Y + k : Y;
        let kx = direction === "horizontal" ? X + k : X;
        matrix[ky][kx] = backup[k];
      }
      return false;
    }
    matrix[cy][cx] = word[i];
  }
  return backup; // return backup so Hicham can undo in the backtracking function
}

function removeWord(matrix, Y, X, backup, direction) {
  for (let i = 0; i < backup.length; i++) {
    let cy = direction === "vertical" ? Y + i : Y;
    let cx = direction === "horizontal" ? X + i : X;
    matrix[cy][cx] = backup[i];
  }
}

function buildSlots(matrix, starts) {
  let slots = [];
  for (let s of starts) {
    if (s.Horizontal) {
      slots.push({
        Y: s.Y,
        X: s.X,
        direction: "horizontal",
        length: getWordLength(matrix, s.Y, s.X, "horizontal"),
      });
    }
    if (s.Vertical) {
      slots.push({
        Y: s.Y,
        X: s.X,
        direction: "vertical",
        length: getWordLength(matrix, s.Y, s.X, "vertical"),
      });
    }
  }
  return slots;
}

// ---------------- FINAL BACKTRACKING FUNCTION ----------------

const words = ["casa", "alan", "ciao", "anta"];
console.log(crosswordSolver(emptyPuzzle, words));
