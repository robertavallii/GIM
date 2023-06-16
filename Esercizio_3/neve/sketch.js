let snowflakes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(2, 6);
    let speed = random(1, 3);
    snowflakes.push(new Snowflake(x, y, size, speed));
  }
}

function draw() {
  background(0);
  
  for (let snowflake of snowflakes) {
    snowflake.update();
    snowflake.display();
  }
}

class Snowflake {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }
  
  update() {
    this.y += this.speed;
    if (this.y > height + this.size) {
      this.y = random(-50, -10);
      this.x = random(width);
    }
  }
  
  display() {
    let depth = map(this.y, 0, height, 255, 100);
    fill(depth);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}