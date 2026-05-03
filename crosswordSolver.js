const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['aaab', 'aaac', 'aaad', 'aaae']
/// The Main function
function crosswordSolver(Puzzle, words) {
  if (typeof Puzzle != "string" || Puzzle == "") {
    console.log("Error");
    return
  }

  if (!Array.isArray(words)) {
    console.log("Error");
    return
  }

  let Matrix = CreateMatrix(Puzzle);

  let StartIndexesWords = IndexOfFirstEmpty(Matrix);
  if (StartIndexesWords === "Error") {
    console.log("Error");
    return
  }

  let res = CreateMatrixFromWords(Matrix, StartIndexesWords, words);
  if (res === "Error") {
    console.log("Error");
    return
  }

  if (res.length === 0) {
    console.log("Error");
    return
  }

  res = res.map((row) => row.join("")).join("\n");
  console.log(res);
}
// ---------------- start part melbouzi ----------------
function CreateMatrix(puzzle) {
  return puzzle.split("\n").map((ele) => [...ele]);
}

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

function IndexOfFirstEmpty(matrix) {
  let matrixLength = matrix[0].length;
  let regex = /[^0-2.]/;
  let arr = [];
  let id = 0;

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].length !== matrixLength) {
      return "Error";
    }
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].match(regex) !== null) {
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

// ---------------- End part melbouzi ----------------

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
    // haitbenal : I changed this line bz this allow to place a letter if cell  == 0 or its match
    if (!(matrix[cy][cx] >= "0" && matrix[cy][cx] <= "9") && matrix[cy][cx] !== word[i]) {
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
function CreateMatrixFromWords(Matrix, StartIndexesWords, words) {
  let slots = buildSlots(Matrix, StartIndexesWords);

  if (slots.length !== words.length) {
    return "Error";
  }

  let usedWords = new Array(words.length).fill(false);
  let solutions = [];
  let uniqueGrids = new Set();

  function solve(slotIndex) {
    if (solutions.length > 1) return;
    if (slotIndex === slots.length) {
      let isFinished = true;
      for (let r = 0; r < Matrix.length; r++) {
        for (let c = 0; c < Matrix[r].length; c++) {
          if (Matrix[r][c] >= "0" && Matrix[r][c] <= "9") {
            isFinished = false;
            break;
          }
        }
        if (!isFinished) break;
      }

      if (isFinished) {
        let str = Matrix.map((row) => row.join("")).join("\n");
        if (!uniqueGrids.has(str)) {
          uniqueGrids.add(str);
          solutions.push(Matrix.map((row) => [...row]));
        }
      }
      return;
    }

    let slot = slots[slotIndex];

    for (let i = 0; i < words.length; i++) {
      if (!usedWords[i] && words[i].length === slot.length) {
        let backup = placeWord(Matrix, slot.Y, slot.X, words[i], slot.direction);
        if (backup !== false) {
          usedWords[i] = true;
          solve(slotIndex + 1);
          usedWords[i] = false;
          removeWord(Matrix, slot.Y, slot.X, backup, slot.direction);
        }
      }
    }
  }
  solve(0);

  if (solutions.length !== 1) {
    return "Error";
  }

  return solutions[0];
}

crosswordSolver(puzzle,words);