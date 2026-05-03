# CrossWords

## Team

- Mohammed amine El bouziani (`melbouzi`)
- Hichame Ait Benalla (`haitbenal`)
- kaoutar Hammaoui (`khammaou`)

## Project Subject

Create a function `crosswordSolver` in `crosswordSolver.js` that solves an empty crossword puzzle.

The function takes:

- `puzzle`: a string representing the empty crossword
- `words`: an array of words used to fill the crossword

The solver must produce a filled puzzle based on these rules:

- Each character in the puzzle is either a number, a `.`, or a newline `\n`
- A number represents how many words start from that position
- A `.` represents a blocked cell that does not need to be filled
- No duplicate words are allowed in the input list
- If the puzzle does not have exactly one valid solution, the program must return or print `Error`

## File

- [crosswordSolver.js](/home/haitbenal/Desktop/CrossWords/crosswordSolver.js)

## How It Works

This project uses a backtracking approach:

- The puzzle string is converted into a matrix
- Valid word start positions are detected and validated
- Horizontal and vertical slots are built from the puzzle
- Words are placed recursively while checking letter compatibility
- If there is not exactly one solution, the solver returns `Error`

## Usage

Run the project with:

```bash
node crosswordSolver.js
```

Example from the current file:

```js
const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ["casa", "alan", "ciao", "anta"];
console.log(crosswordSolver(emptyPuzzle, words));
```

## Expected Behavior

Return the solved crossword when the solution is unique.

Return `Error` when any of the following happens:

- the puzzle format is invalid
- the rows do not have the same length
- a cell contains invalid characters
- the number hints do not match the actual word starts
- the number of slots and words do not match
- the puzzle has no solution
- the puzzle has more than one solution

