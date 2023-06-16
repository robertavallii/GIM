let x;
let y;
let velX;
let velY;
let hue;

function setup() {
  createCanvas(900, 700);
  x = width / 2;
  y = height / 2;
  velX = 5;
  velY = 5;
  hue = random(360); // Genera una tonalità casuale all'inizio
}

function draw() {
  background(0);
  colorMode(HSB); // Imposta la modalità di colore su HSB per utilizzare la tonalità

  let brightness = map(x, 100, width, 100, 100);
  let col = color(hue, 100, brightness);

  fill(col);
  noStroke();
  ellipse(x, y, 20, 20);

  if (x + velX > width || x + velX < 0) {
    velX = -velX;
    hue = random(360); // Cambia la tonalità quando la pallina rimbalza
  }

  if (y + velY > height || y + velY < 0) {
    velY = -velY;
    hue = random(360); // Cambia la tonalità quando la pallina rimbalza
  }

  x = constrain(x + velX, 0, width);
  y = constrain(y + velY, 0, height);
}

function mouseMoved() {
  let dx = mouseX - x;
  let dy = mouseY - y;

  velX = dx / 10;
  velY = dy / 10;
}