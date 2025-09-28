//A2 Praewa Boonanan
//68-010126-1037-5

let a = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
];

function setup() {
  createCanvas(1000,700);
  textAlign(CENTER, CENTER);
  textSize(16);
  
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      let appear = int(random(10));
      if (appear <= 8) {
        a[i][j] = int(random(1,10));
      }
    }
  }
}

function drawSquare(x,y){
  line(x*50,y*50,x*50,(y+1)*50);
  line(x*50,y*50,(x+1)*50,y*50);
  line((x+1)*50,y*50,(x+1)*50,(y+1)*50);
  line(x*50,(y+1)*50,(x+1)*50,(y+1)*50);
}

function drawGrid(arr){
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      drawSquare(j,i);
      text(arr[i][j], j*50 + 25, i*50 + 25);
    }
  }
}
