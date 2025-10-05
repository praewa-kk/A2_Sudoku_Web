//A2 Praewa Boonanan
//68-010126-1037-5

let grid = Array.from({length: 9}, () => Array(9).fill(0));
let locked = Array.from({length: 9}, () => Array(9).fill(false));
let gridSize = 50;
let gridNumSize = 100;
let selectRow = -1;
let selectCol = -1;
let selectNum = 0;

function setup(){
  createCanvas(1000, 500);
  newGame();
}

function draw(){
  background(255);
  drawGameUI();
  drawGrid();
  drawNum();
  drawNumpadGrid();
  drawNumpadNum();
}


function drawGrid(){
  stroke(0);
  let i = 0;
  while (i <= 9){
    strokeWeight(i % 3 === 0 ? 3 : 1);
    line(i * gridSize, 0, i * gridSize, 9 * gridSize);
    line(0, i * gridSize, 9 * gridSize, i * gridSize);
    i += 1;
  }
}

function drawNum(){
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  let row = 0;
  while (row < 9){
    let col = 0;
    while (col < 9){
      if(grid[row][col] !== 0){
        text(grid[row][col], col*gridSize + gridSize/2, row*gridSize + gridSize/2);
      }
      col += 1;
    }
    row += 1;
  }
}

// === Numpad ===
function drawNumpadGrid(){
  stroke(0);
  strokeWeight(3);
  let i = 0;
  while (i < 4){
    line(i*gridNumSize+600, 0, i*gridNumSize+600, 4*gridNumSize);
    i += 1;
  }
  let i2 = 1;
  while (i2 < 5){
    line(600, i2*gridNumSize, 3*gridNumSize+600, i2*gridNumSize);
    i2 += 1;
  }
}

function drawNumpadNum(){
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(0);
  let numpadNum = 1;
  let i = 0;
  while (i < 3){
    let j = 0;
    while (j < 3){
      text(numpadNum, j*gridNumSize+600+gridNumSize/2, i*gridNumSize+gridNumSize/2);
      numpadNum++;
      j += 1;
    }
    i +=1
  }
  text("-", 600+gridNumSize+gridNumSize/2, 3*gridNumSize+gridNumSize/2);
}

// === Input ===
function mousePressed(){
  // click grid
  if(mouseY < 9*gridSize && mouseX < 9*gridSize){
    if(!locked[Math.floor(mouseY/gridSize)][Math.floor(mouseX/gridSize)]){
      selectCol = Math.floor(mouseX/gridSize);
      selectRow = Math.floor(mouseY/gridSize);
    } else {
      console.log("Can't change this number");
    }
  }
  // click numpad
  if(mouseY < 400 && mouseX > 600 && mouseX < 900){
    if(mouseY < 100){
      if(mouseX < 700) selectNum = 1;
      else if(mouseX < 800) selectNum = 2;
      else selectNum = 3;
    } else if(mouseY < 200){
      if(mouseX < 700) selectNum = 4;
      else if(mouseX < 800) selectNum = 5;
      else selectNum = 6;
    } else if(mouseY < 300){
      if(mouseX < 700) selectNum = 7;
      else if(mouseX < 800) selectNum = 8;
      else selectNum = 9;
    } else {
      if(mouseX > 700 && mouseX < 800) selectNum = 0;
    }
  }

  // put number in grid
  if(selectRow !== -1 && selectCol !== -1){
    if(selectNum === 0 || checkValid(grid, selectNum, selectRow, selectCol)){
      grid[selectRow][selectCol] = selectNum;
      selectNum = 0;
    } else {
      console.log("Invalid number");
    }
  }
}

// === Logic ===
function checkValid(arr, num, row, col){
  let startRow = Math.floor(row/3)*3;
  let startCol = Math.floor(col/3)*3;

  let i = startRow
  while (i < startRow + 3){
    let j = startCol
    while (j < startCol + 3){
      if(arr[i][j] === num && !(i === row && j === col)){
        return false;
      }
      j += 1;
    }
    i += 1;
  }
  let j = 0;
  while (j < 9){
    if(j !== col && arr[row][j] === num) return false;
    j += 1;
  }
  let i2 = 0;
  while (i2 < 9){
    if(i2 !== row && arr[i2][col] === num) return false;
    i2 += 1;
  }
  return true;
}

// === Shuffle + Generate ===
function shuffleArray(arr){
  let i = arr.length-1;
  while (i > 0){
    let j = Math.floor(random(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i = i - 1;
  }
}

function generateFullBoard(board){
  let row = 0;
  while (row < 9){
    let col = 0;
    while (col < 9){
      if(board[row][col] === 0){
        let numbers = [1,2,3,4,5,6,7,8,9];
        shuffleArray(numbers);
        
        for(let n of numbers){
          if(checkValid(board, n, row, col)){
            board[row][col] = n;
            if(generateFullBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
      col += 1;
    }
    row += 1;
  }
  return true;
}

function newGame(){
  let full = Array.from({length: 9}, () => Array(9).fill(0));
  generateFullBoard(full);

  let r = 0;
  while (r < 9){
    let c = 0;
    while (c < 9){
      grid[r][c] = full[r][c];
      locked[r][c] = true;
      c += 1;
    }
    r += 1;
  }
  let holes = 50;
  let k = 0;
  while (k < holes){
    let r = Math.floor(random(9));
    let c = Math.floor(random(9));
    grid[r][c] = 0;
    locked[r][c] = false;
    k += 1;
  }
}

// === UI ===
function drawGameUI(){
  if(selectRow !== -1 && selectCol !== -1){
    fill(200,200,255,100);
    noStroke();
    rect(selectCol*gridSize, selectRow*gridSize, gridSize, gridSize);
  }
  let row = 0;
  while (row < 9){
    let col = 0;
    while (col < 9){
      if(locked[row][col]){
        fill(225);
        noStroke();
        rect(col*gridSize, row*gridSize, gridSize, gridSize);
      }
      col += 1;
    }
    row += 1;
  }
}
