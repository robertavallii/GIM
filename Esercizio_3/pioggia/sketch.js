let drops = [];
// let drops= 

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 100; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  background(0);
  for (let i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }
}
// array drop oggetti uguali?
class Drop {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.velY = random(5, 15);
    this.length = random(10, 20);
  }
// caduta pioggia
  fall() {
    this.y += this.velY;
    if (this.y > height) {
      this.y = random(-500, 50);
    }
  }
//gocce di pioggia 
  show() {
    stroke(180, 180, 220);
    strokeWeight(random(0., 0.9));
    line(this.x, this.y, this.x, this.y + this.length);
  }
}