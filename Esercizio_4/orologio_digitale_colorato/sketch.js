function setup(){
	createCanvas(windowWidth, windowHeight)
	background(200)


}

function draw(){

	let ora = hour() + ":" + minute () +  ":"  +  second ()

	textSize (40)
	textFont ("monospace")
	textAlign(CENTER, CENTER)
	fill (random(255), random (255), random(255))
	text(ora, mouseX, mouseY)

}