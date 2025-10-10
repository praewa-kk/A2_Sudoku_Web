//A2 Praewa Boonanan
//68-010126-1037-5

let grid = Array.from({ length: 9 }, () => Array(9).fill(0));
let locked = Array.from({ length: 9 }, () => Array(9).fill(false));
let gridSize = 50;
let gridNumSize = 100;
let selectRow = -1;
let selectCol = -1;
let selectNum = 0;
let answer = true;
let stage = false;
let menuY = 0;

function setup() {
  createCanvas(1000, 500);
  stage = false;
  menuY = height;
}

function draw() {
  background(255);
  if (!stage) {
    if (menuY < height) menuY += 20;
    else background(0);
    openMenu();
  } else {
    drawGameUI();
    drawGrid();
    drawNum();
    drawNumpadGrid();
    drawNumpadNum();
    drawSaveButton();
    drawMenuButton();
    if (menuY > 0) menuY -= 20;
  }
}

function drawGrid() {
  stroke(0);
  let i = 0;
  while (i <= 9) {
    strokeWeight(i % 3 === 0 ? 3 : 1);
    line(i * gridSize, 0, i * gridSize, 9 * gridSize);
    line(0, i * gridSize, 9 * gridSize, i * gridSize);
    i += 1;
  }
}

function drawNum() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] !== 0) {
        text(grid[r][c], c * gridSize + gridSize / 2, r * gridSize + gridSize / 2);
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
  for (let j = 0; j < 5; j++) {
    line(600, j * gridNumSize, 3 * gridNumSize + 600, j * gridNumSize);
  }
}

function drawNumpadNum() {
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(0);
  let num = 1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      text(num, j * gridNumSize + 600 + gridNumSize / 2, i * gridNumSize + gridNumSize / 2);
      num++;
    }
  }
  text("-", 600 + gridNumSize + gridNumSize / 2, 3 * gridNumSize + gridNumSize / 2);
}

function mousePressed() {

  if (!stage) {
    if (mouseX >= width / 2 - 100 && mouseY >= menuY - 270 && mouseX <= width / 2 + 100 && mouseY <= menuY - 230) {
      stage = true;
      newGame();
    }
    if (mouseX >= width / 2 - 100 && mouseY >= menuY - 220 && mouseX <= width / 2 + 100 && mouseY <= menuY - 180) {
      loadGame();
      stage = true;
    }
    return;
  }

  if (mouseY < 9 * gridSize && mouseX < 9 * gridSize) {
    if (!locked[Math.floor(mouseY / gridSize)][Math.floor(mouseX / gridSize)]) {
      selectCol = Math.floor(mouseX / gridSize);
      selectRow = Math.floor(mouseY / gridSize);
      answer = true;
    }
  }

  if (mouseY < 400 && mouseX > 600 && mouseX < 900) {
    let numX = Math.floor((mouseX - 600) / 100);
    let numY = Math.floor(mouseY / 100);
    if (numY < 3) selectNum = numY * 3 + numX + 1;
    else if (numY === 3 && numX === 1) selectNum = 0;
  }

  if (selectRow !== -1 && selectCol !== -1 && selectNum !== undefined) {
    if (selectNum === 0 || checkValid(grid, selectNum, selectRow, selectCol)) {
      grid[selectRow][selectCol] = selectNum;
      selectNum = 0;
      answer = true;
    } else {
      selectNum = 0;
      console.log("Invalid number");
      answer = false;
    }
  }

  if (mouseX > width / 2 + gridNumSize && mouseX < width / 2 + gridNumSize * 2 && mouseY > height - 70 && mouseY < height - 30) {
    saveGame();
  }

  if (mouseX > width / 2 + gridNumSize * 3 && mouseX < width / 2 + gridNumSize * 4 && mouseY > height - 70 && mouseY < height - 30) {
    stage = false;
  }
}

function checkValid(arr, num, row, col) {
  for (let i = 0; i < 9; i++) {
    if (arr[row][i] === num && i !== col) return false;
    if (arr[i][col] === num && i !== row) return false;
  }
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (arr[r][c] === num && (r !== row || c !== col)) return false;
    }
  }
  return true;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(random(i + 1));
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
  grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  locked = Array.from({ length: 9 }, () => Array(9).fill(false));

  let full = Array.from({ length: 9 }, () => Array(9).fill(0));
  generateFullBoard(full);

  let holes = 50;
  while (holes > 0) {
    let r = Math.floor(random(9));
    let c = Math.floor(random(9));
    if (full[r][c] !== 0) {
      full[r][c] = 0;
      locked[r][c] = false;
      holes--;
    }
  }
  grid = full.map(r => [...r]);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] !== 0) locked[r][c] = true;
    }
  }
}

function saveGame() {
  localStorage.setItem("sudoku_grid", JSON.stringify(grid));
  localStorage.setItem("sudoku_locked", JSON.stringify(locked));
  console.log("✅ Game saved!");
}

function loadGame() {
  let savedGrid = localStorage.getItem("sudoku_grid");
  let savedLocked = localStorage.getItem("sudoku_locked");
  if (savedGrid && savedLocked) {
    grid = JSON.parse(savedGrid);
    locked = JSON.parse(savedLocked);
    console.log("✅ Game loaded!");
  } else {
    console.log("⚠️ No saved game found!");
  }
}


function drawGameUI() {
  if (selectRow !== -1 && selectCol !== -1) {
    fill(answer ? color(200, 200, 255, 100) : color(255, 0, 0, 100));
    noStroke();
    rect(selectCol * gridSize, selectRow * gridSize, gridSize, gridSize);
  }
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (locked[r][c]) {
        fill(230);
        noStroke();
        rect(c * gridSize, r * gridSize, gridSize, gridSize);
      }
    }
  }
}

function openMenu() {
  fill(0);
  rect(0, 0, width, menuY);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
  text("A2 Sudoku the Game", width / 2, menuY - 400);
  textSize(25);
  rect(width / 2 - 100, menuY - 270, 200, 40);
  rect(width / 2 - 100, menuY - 220, 200, 40);
  fill(0);
  text("New Game", width / 2, menuY - 250);
  text("Load Game", width / 2, menuY - 200);
}

function drawSaveButton() {
  fill(255);
  rect(width / 2 + gridNumSize, height - 70, gridNumSize, 40);
  fill(0);
  textSize(20);
  text("Save", width / 2 + gridNumSize + gridNumSize / 2, height - 50);
}

function drawMenuButton() {
  fill(255);
  rect(width / 2 + gridNumSize * 3, height - 70, gridNumSize, 40);
  fill(0);
  textSize(20);
  text("Menu", width / 2 + gridNumSize * 3 + gridNumSize / 2, height - 50);
}
