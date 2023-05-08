let posizioneX
let posizioneY
let velX
let velY

function setup(){
	createCanvas(800, 400)
	posizioneX = width/2
	posizioneY = height/2
	velX = 3
	velY = 3
	background (100)


}

function draw(){

	noStroke ()
	fill (random(50, 100), random(0, 200), random(0, 200))


	ellipse (posizioneX, posizioneY, 50, 50)

	posizioneX = posizioneX + velX
	posizioneY = posizioneY + velY

	if (posizioneX >= width ||  posizioneX <= 0)  velX = -velX
	if (posizioneY >= height ||  posizioneY <= 0)  velY = -velY



}


function keyPressed(){

	save("pong.png")


}