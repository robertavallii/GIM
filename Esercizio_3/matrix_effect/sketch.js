// Imposta la canvas
let canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Imposta il contesto 2D
let ctx = canvas.getContext('2d');

// Imposta il font
let fontSize = 10;
let fontColor = '#ccc';
ctx.font = `${fontSize}px Arial`;

// Crea la matrice
let columns = canvas.width / fontSize;
let matrix = [];
for(let i = 0; i < columns; i++) {
  matrix.push(canvas.height / 2);
}

// Lista di caratteri ammessi
let charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Aggiorna l'animazione
function update() {
  // Pulisci la canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Disegna i caratteri
  ctx.fillStyle = fontColor;
  for(let i = 0; i < matrix.length; i++) {
    let char = charList.charAt(Math.floor(Math.random() * charList.length));
    ctx.fillText(char, i * fontSize, matrix[i]);
    matrix[i] += fontSize;

    // Se il carattere è troppo in basso, riportalo in cima
    if(matrix[i] > canvas.height && Math.random() > 0.975) {
      matrix[i] = 0;
    }
  }

  // Richiama l'aggiornamento della canvas
  requestAnimationFrame(update);
}

// Avvia l'animazione
update();