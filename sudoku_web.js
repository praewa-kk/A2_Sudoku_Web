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
let dificulty = 0;
let menuY = 0;

function setup() {
  createCanvas(1000, 500);
  stage = false;
  menuY = height;
}

function draw() {
  if (!stage) {
    if (menuY < height) menuY += 20;
    else background(0);
    openMenu();
  }
  if (stage) {
    background(255);
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
    if (i % 3 === 0) strokeWeight(3);
    else strokeWeight(1);
    line(i * gridSize, 0, i * gridSize, 9 * gridSize);
    line(0, i * gridSize, 9 * gridSize, i * gridSize);
    i += 1;
  }
}

function drawNum() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  let row = 0;
  while (row < 9) {
    let col = 0;
    while (col < 9) {
      if (grid[row][col] !== 0) {
        text(grid[row][col], col * gridSize + gridSize / 2, row * gridSize + gridSize / 2);
      }
      col += 1;
    }
    row += 1;
  }
}


function drawNumpadGrid() {
  stroke(0);
  strokeWeight(3);
  let i = 0;
  while (i < 4) {
    line(i * gridNumSize + 600, 0, i * gridNumSize + 600, 4 * gridNumSize);
    i += 1;
  }
  let j = 0;
  while (j < 5) {
    line(600, j * gridNumSize, 3 * gridNumSize + 600, j * gridNumSize);
    j += 1;
  }
}

function drawNumpadNum() {
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(0);
  let numpadNum = 1;
  let i = 0;
  while (i < 3) {
    let j = 0;
    while (j < 3) {
      text(numpadNum, j * gridNumSize + 600 + gridNumSize / 2, i * gridNumSize + gridNumSize / 2);
      numpadNum += 1;
      j += 1;
    }
    i += 1;
  }
  text("-", 600 + gridNumSize + gridNumSize / 2, 3 * gridNumSize + gridNumSize / 2);
}


function mousePressed() {
  if (!stage) {
    if (mouseX >= width / 2 - 100 && mouseY >= menuY - 270 && mouseX <= width / 2 + 100 && mouseY <= menuY - 230) {
      stage = true;
      newGame();
    }
  }
  if (stage) {
    if (mouseY < 9 * gridSize && mouseX < 9 * gridSize) {
      if (!locked[Math.floor(mouseY / gridSize)][Math.floor(mouseX / gridSize)]) {
        selectCol = Math.floor(mouseX / gridSize);
        selectRow = Math.floor(mouseY / gridSize);
        answer = true;
      } else console.log("Can't change this number");
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
      } else if (mouseX > 700 && mouseX < 800) selectNum = 0;
    }

    if (selectRow !== -1 && selectCol !== -1) {
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
  }
}


function checkValid(arr, num, row, col) {
  let i = Math.floor(row / 3) * 3;
  while (i < Math.floor(row / 3) * 3 + 3) {
    let j = Math.floor(col / 3) * 3;
    while (j < Math.floor(col / 3) * 3 + 3) {
      if (arr[i][j] === num && !(i === row && j === col)) return false;
      j += 1;
    }
    i += 1;
  }

  let j2 = 0;
  while (j2 < 9) {
    if (j2 !== col && arr[row][j2] === num) return false;
    j2 += 1;
  }

  let i2 = 0;
  while (i2 < 9) {
    if (i2 !== row && arr[i2][col] === num) return false;
    i2 += 1;
  }

  return true;
}


function shuffleArray(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    let j = Math.floor(random(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i -= 1;
  }
}

function generateFullBoard(board) {
  let row = 0;
  while (row < 9) {
    let col = 0;
    while (col < 9) {
      if (board[row][col] === 0) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);
        let i = 0;
        while (i < numbers.length) {
          let n = numbers[i];
          if (checkValid(board, n, row, col)) {
            board[row][col] = n;
            if (generateFullBoard(board)) return true;
            board[row][col] = 0;
          }
          i += 1;
        }
        return false;
      }
      col += 1;
    }
    row += 1;
  }
  return true;
}

function newGame() {
  let full = Array.from({ length: 9 }, () => Array(9).fill(0));
  generateFullBoard(full);

  let r = 0;
  while (r < 9) {
    let c = 0;
    while (c < 9) {
      grid[r][c] = full[r][c];
      locked[r][c] = true;
      c += 1;
    }
    r += 1;
  }

  let holes = 50;
  let k = 0;
  while (k < holes) {
    let r2 = Math.floor(random(9));
    let c2 = Math.floor(random(9));
    grid[r2][c2] = 0;
    locked[r2][c2] = false;
    k += 1;
  }
}


function drawGameUI() {
  if (selectRow !== -1 && selectCol !== -1) {
    if (answer) fill(200, 200, 255, 100);
    else fill(225, 0, 0, 100);
    noStroke();
    rect(selectCol * gridSize, selectRow * gridSize, gridSize, gridSize);
  }

  let row = 0;
  while (row < 9) {
    let col = 0;
    while (col < 9) {
      if (locked[row][col]) {
        fill(225);
        noStroke();
        rect(col * gridSize, row * gridSize, gridSize, gridSize);
      }
      col += 1;
    }
    row += 1;
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
  text("Save Game", width / 2 + gridNumSize + gridNumSize / 2, height - 50);
}

function drawMenuButton() {
  fill(255);
  rect(width / 2 + gridNumSize * 3, height - 70, gridNumSize, 40);
  fill(0);
  textSize(20);
  text("Menu", width / 2 + gridNumSize * 3 + gridNumSize / 2, height - 50);
}
