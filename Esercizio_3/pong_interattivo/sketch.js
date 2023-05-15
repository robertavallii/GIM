let x;
let y;
let velX;
let velY;
let col;

function setup() {
  createCanvas(900, 700);
  x = width / 2;
  y = height / 2;
  velX = 5;
  velY = 5;
  col = color(255);
}

function draw() {
  background(0);
  fill (col);
  noStroke();
  ellipse(x, y, 20, 20);
  
  // palliina tocca margine
  if (x + velX > width || x + velX < 0) {
    velX = -velX; // cambia direz.
    col = color(random(255), random(255), random(255)); // cambio colore
  }  
  // palliina tocca margine
  if (y + velY > height || y + velY < 0) {
    velY = -velY; // cambia direz.
    col = color(random(255), random(255), random(255)); // cambio colore
  }

  // pallina non esce da canvas
  x = constrain(x + velX, 0, width);
  y = constrain(y + velY, 0, height);
}

function mouseMoved() {
  // movimento maouse e pallina
  let dx = mouseX - x;
  let dy = mouseY - y;

  // calcolo velocità in base alla distanza del mouse
  velX = dx / 10;
  velY = dy / 10;


}