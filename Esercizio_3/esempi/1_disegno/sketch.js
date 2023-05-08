function setup(){
	createCanvas(400, 400)
}

function draw(){
	background(150)

	point(0, 0)
	point(31, 50)	
	point(32, 50)	
	point(33, 50)

	
	// funzione che disegna rettangolo si deve mettere x y base e altezzza

fill (255, 0, 0)
rect (150, 150, 90, 90)


//contorno senza riempimento
strokeWeight (3)
stroke (0, 255, 0)
rect (120, 120, 90, 90)

	//funzione che disegna un segmento
line(50, 60, 200, 250)

// per la trasparenza devo aggiungere un quarto parametro dopo il coloe, corrisponderebbe a alpha 
fill (0, 180, 240, 128)
ellipse (230, 270, 80, 80)

//forma con contorno senza riempimento
noFill ()
triangle (300, 100, 390, 160, 210, 180)
	

}