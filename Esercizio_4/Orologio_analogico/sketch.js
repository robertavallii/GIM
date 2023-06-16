function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){

	let h = hour()
	let m = minute()
	let s = second()
	let ms = new Date().getMilliseconds()

	let angolo_h = TWO_PI / 12 * h + TWO_PI / 12 / 60 * m
	let angolo_m = TWO_PI / 60 * m
	let angolo_s = TWO_PI / 60 * s + TWO_PI / 60 * ms / 1000

	background(0)

	// spostiamo l'origine in centro 
	translate(width/2, height/2)	
	scale (0.8)

	// bordo esterno
	noStroke()
	fill(255)
	ellipse(0, 0, 440, 440)


	fill(0)
	push()
	for (let i=0; i<60; i++) {
		
		if (i % 5 == 0) {
			rect(-7, -210, 14, 50)
		} else {		
			rect(-3, -210, 6, 16)
		}
		
		rotate(TWO_PI / 60)
	}
	pop()



	fill(0)

	// ruotiamo per le ore
	push()
	rotate(angolo_h)
	rect (-12, 40, 24, -160)
	pop()	

	// ruotiamo per i minuti 
	push()
	rotate(angolo_m)
	rect (-9, 36, 18, -235)
	pop()

	// ruotiamo per i secondi 
	fill(255, 0, 0)
	push()
	rotate(angolo_s)	
	rect (-2, 40, 4, -180)
	ellipse(0, -140, 40, 40)
	pop()

	// stroke(0, 0, 200)
	// line (0, -1000, 0, 1000)
	// line (-1000, 0, 1000, 0)

}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}