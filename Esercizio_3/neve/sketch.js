let snowflakes = [];

function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 100; i++) {
    snowflakes[i] = new Snowflake();
  }
}

function draw() {
  background(0);
  for (let i = 0; i < snowflakes.length; i++) {
    snowflakes[i].fall();
    snowflakes[i].show();
  }
}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.velY = random(1, 3);
    this.radius = random(2, 8);
    this.angle = random(0, TWO_PI);
  }

  fall() {
    this.angle += 0.01;
    this.y += this.velY;
    this.x += sin(this.angle) * 2;

    if (this.y > height) {
      this.y = random(-500, -50);
      this.x = random(width);
    }
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.radius);
  }
}