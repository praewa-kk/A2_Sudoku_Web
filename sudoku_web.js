//A2 Praewa Boonanan
//68-010126-1037-5

let grid = Array.from({length: 9}, () => Array(9).fill(0));
let locked = Array.from({length: 9}, () => Array(9).fill(false));
let gridSize = 50;
let gridNumSize = 100;

function setup() {
  createCanvas(1000, 500);
  newGame();
}

function draw() {
  background(255);
  drawGrid();
  drawNum();
  drawNumpadGrid();
  drawNumpadNum();
}

// วาดกระดาน
function drawGrid() {
  stroke(0);
  for (let i = 0; i <= 9; i++) {
    strokeWeight(i % 3 === 0 ? 3 : 1);
    line(i * gridSize, 0, i * gridSize, 9 * gridSize);
    line(0, i * gridSize, 9 * gridSize, i * gridSize);
  }
}

function drawNum() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] !== 0) {
        text(grid[r][c], c * gridSize + gridSize/2, r * gridSize + gridSize/2);
      }
    }
  }
}

// วาด numpad
function drawNumpadGrid() {
  stroke(0);
  strokeWeight(3);
  for (let i = 0; i < 4; i++) {
    line(i * gridNumSize + 600, 0, i * gridNumSize + 600, 4 * gridNumSize);
  }
  for (let i = 0; i < 5; i++) {
    line(600, i * gridNumSize, 3 * gridNumSize + 600, i * gridNumSize);
  }
}

function drawNumpadNum() {
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(0);
  let numpadNum = 1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      text(numpadNum, j * gridNumSize + 600 + gridNumSize/2, i * gridNumSize + gridNumSize/2);
      numpadNum++;
    }
  }
  text("-", 600 + gridNumSize + gridNumSize/2, 3 * gridNumSize + gridNumSize/2);
}

// Logic check
function checkValid(arr, num, row, col) {
  let startRow = Math.floor(row/3)*3;
  let startCol = Math.floor(col/3)*3;

  for (let i = startRow; i < startRow+3; i++) {
    for (let j = startCol; j < startCol+3; j++) {
      if (arr[i][j] === num && !(i === row && j === col)) return false;
    }
  }
  for (let j = 0; j < 9; j++) {
    if (j !== col && arr[row][j] === num) return false;
  }
  for (let i = 0; i < 9; i++) {
    if (i !== row && arr[i][col] === num) return false;
  }
  return true;
}

// shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(random(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function generateFullBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        let numbers = [1,2,3,4,5,6,7,8,9];
        shuffleArray(numbers);

        for (let n of numbers) {
          if (checkValid(board, n, row, col)) {
            board[row][col] = n;
            if (generateFullBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function newGame() {
  let full = Array.from({length: 9}, () => Array(9).fill(0));
  generateFullBoard(full);

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      grid[r][c] = full[r][c];
      locked[r][c] = true;
    }
  }

  let holes = 50;
  for (let k = 0; k < holes; k++) {
    let r = Math.floor(random(9));
    let c = Math.floor(random(9));
    grid[r][c] = 0;
    locked[r][c] = false;
  }
}
