let posizioneX;
let posizioneY;
let velX;
let velY;
let collisione;

function setup(){
  createCanvas(900, 600);
  posizioneX = width / 2;
  posizioneY = height / 2;
  velX = (-10, -5);
  velY = (-10, -5);
  background(0);
}

function draw(){
  noStroke()
  fill(randomColor());
  ellipse(posizioneX, posizioneY, 30, 30);

  posizioneX += velX;
  posizioneY += velY;

  // Controllo magine orizzontale
  if (posizioneX + 25 >= width || posizioneX - 20 <= 0) {
    velX = -velX;
  }
  if (posizioneY + 25 >= height || posizioneY - 20 <= 0) {
    velY = -velY;
  }
  // Controllo spostamento orizzontale
  if (posizioneX >= width - 30 || posizioneX <= 30) {
    velX = -velX;
  }
}

function keyPressed(){
  save("pong.png");
}

{
  // Definiamo una palette di colori
  let palette = [
      color("#FFA07A"), // Light Salmon
      color("#FF8C00"), // Dark Orange
      color("#FF7F50"), // Coral
      color("#FF6347"), // Tomato
      color("#FF4500")  // Orange Red
  ];

  // Selezioniamo casualmente un colore dalla palette
  let index = floor(random(palette.length));
  return color(palette[index]);
}


