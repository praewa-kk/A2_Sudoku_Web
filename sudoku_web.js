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
