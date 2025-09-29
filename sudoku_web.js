//A2 Praewa Boonanan
//68-010126-1037-5

let grid = Array.from({ length: 9 }, () => Array(9).fill(0));
let gridSize = 50;

function setup(){
  createCanvas(1000, 500);
  createBoard();
}

function draw(){
  background(255);
  drawGrid();
  drawNum();
}

function createBoard() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (int(random(9)) < 5) {
        grid[row][col] = int(random(1, 10));
        while (!checkValid(grid, grid[row][col], row, col)){
          grid[row][col] = int(random(1, 10));
        }
      } else {
        grid[row][col] = 0;
      }
    }
  }
}

function drawGrid(){
  stroke(0);
  for (let i = 0; i <= 9; i++) {
    if (i % 3 === 0) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }
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
          grid[row][col],col * gridSize + gridSize / 2,row * gridSize + gridSize / 2);
      }
    }
  }
}

function checkValid(arr, num, row, col){
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (arr[i][j] === num && !(i === row && j === col)) {
        return false;
      }
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
