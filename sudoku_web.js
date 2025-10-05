//A2 Praewa Boonanan
//68-010126-1037-5

let grid = Array.from({ length: 9 }, () => Array(9).fill(0));
let locked = Array.from({ length: 9 }, () => Array(9).fill(false));
let gridSize = 50;
let gridNumSize = 100;
let selectRow = -1;
let selectCol = -1;
let selectNum = 0;

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
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] !== 0) {
        text(
          grid[row][col],
          col * gridSize + gridSize / 2,
          row * gridSize + gridSize / 2
        );
      }
    }
  }
}


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
      text(
        numpadNum,
        j * gridNumSize + 600 + gridNumSize / 2,
        i * gridNumSize + gridNumSize / 2
      );
      numpadNum++;
    }
  }
  text("-", 600 + gridNumSize + gridNumSize / 2, 3 * gridNumSize + gridNumSize / 2);
}

// ---------------- Input ----------------
function mousePressed() {

  if (mouseY < 9 * gridSize && mouseX < 9 * gridSize) {
    if (!locked[floor(mouseY / gridSize)][floor(mouseX / gridSize)]) {
      selectCol = floor(mouseX / gridSize);
      selectRow = floor(mouseY / gridSize);
    } else {
      console.log("Can't change this number");
    }
  }


  if (mouseY < 400 && mouseX > 600 && mouseX < 900) {
    if (mouseY < 100) {
      if (mouseX < 700) selectNum = 1;
      else if (mouseX < 800) selectNum = 2;
      else selectNum = 3;
    } else if (mouseY < 200) {
      if (mouseX < 700) selectNum = 4;
      else if (mouseX < 800) selectNum = 5;
      else selectNum = 6;
    } else if (mouseY < 300) {
      if (mouseX < 700) selectNum = 7;
      else if (mouseX < 800) selectNum = 8;
      else selectNum = 9;
    } else {
      if (mouseX > 700 && mouseX < 800) selectNum = 0;
    }
  }


  if (selectRow !== -1 && selectCol !== -1) {
    if (selectNum === 0 || checkValid(grid, selectNum, selectRow, selectCol)) {
      grid[selectRow][selectCol] = selectNum;
      selectNum = 0;
    } else {
      console.log("Invalid number");
    }
  }
}

// ---------------- Logic ----------------
function checkValid(arr, num, row, col) {
  for (let j = 0; j < 9; j++) {
    if (j !== col && arr[row][j] === num) return false;
  }
  for (let i = 0; i < 9; i++) {
    if (i !== row && arr[i][col] === num) return false;
  }

  let startRow = floor(row / 3) * 3;
  let startCol = floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (arr[i][j] === num && !(i === row && j === col)) return false;
    }
  }
  return true;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function generateFullBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
  let full = Array.from({ length: 9 }, () => Array(9).fill(0));
  generateFullBoard(full);

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      grid[r][c] = full[r][c];
      locked[r][c] = true;
    }
  }

  let holes = 50;
  for (let k = 0; k < holes; k++) {
    let r = floor(random(9));
    let c = floor(random(9));
    grid[r][c] = 0;
    locked[r][c] = false;
  }
}
