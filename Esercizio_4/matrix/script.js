// simboli per minuti, ore ...
const MINUTE_SYM = {
  PAST: ".  ", // '⬛ ',
  FUTURE: "*  ", // '⬜ ',
  PRESENT: "X  ", // '🔲 ',
  PRESENT_PROGRESS: ["˺", "˼", "˻", "˹"].map(c => c + "  ") 
};

// ora per fare partire orologio. 
// parametro di default 0
const startHourQuery = location.search.match(/\?.*(sh)=(\d{1,2})/);
const START_HOUR = startHourQuery ? parseInt(startHourQuery[2]) : 0;

// // Frequenza di aggiornamento del display in millisecondi
const DISPLAY_UPDATE_INTERVAL = 1000;

// Jtempo metrico (da capire?)
const HOURS_IN_DAY = 24;
const MINS_IN_HOUR = 60;

// Prefix targetNum with zeros up to the specified digits (da capire)
const zeroPad = (targetNum, digits) =>
  "0".repeat(digits - String(targetNum).length) + targetNum;

// matrice dll'orologioo (minuti e ore/ verticale e orizzontale)
const printClockMatrix = cm => {
  // calcolare larghezza colonne e altezza righe
  const columnWidth = 3; // diminuisci dimensione
  const rowHeight = 3; // aumenta dimensione

  // etichette ore
  let clockString = " ".repeat(columnWidth);
  for (let mins = 0; mins < MINS_IN_HOUR; ++mins) {
    const minuteLabel = zeroPad(mins, 2);
    clockString += minuteLabel + " ".repeat(columnWidth - minuteLabel.length);
  }
  clockString += "\n";

  // file dei minuti
  for (let hours = 0; hours < HOURS_IN_DAY; ++hours) {
    const shiftedHours = (hours + START_HOUR) % HOURS_IN_DAY;
    const hourLabel = zeroPad(shiftedHours, 2);
    clockString += hourLabel + " ".repeat(columnWidth - hourLabel.length);

    for (let mins = 0; mins < MINS_IN_HOUR; ++mins) {
      clockString += cm[hours][mins];
      clockString += " ".repeat(columnWidth - MINUTE_SYM.PAST.length);
    }
    clockString += "\n".repeat(rowHeight - 1); // Add extra line breaks
  }

  return clockString;
};

// Generare una matrice di orologio per la data
const generateClockMatrix = date => {
  const hours = (date.getHours() + HOURS_IN_DAY - START_HOUR) % HOURS_IN_DAY;
  const mins = date.getMinutes();
  const secs = date.getSeconds();
  const ms = date.getMilliseconds();

  // Matrice orologio. riga:colonna -> ora:minuto
  const clockMatrix = new Array(HOURS_IN_DAY);
  for (let h = 0; h < HOURS_IN_DAY; ++h) {
    clockMatrix[h] = new Array(MINS_IN_HOUR);
    for (let m = 0; m < MINS_IN_HOUR; ++m) {
      // passato
      if (h < hours || (h === hours && m < mins)) {
        clockMatrix[h][m] = MINUTE_SYM.PAST;
      } else if (h === hours && m === mins) {
        // presente
        clockMatrix[h][m] =
          MINUTE_SYM.PRESENT_PROGRESS[
            Math.floor((secs * 1000 + ms) / DISPLAY_UPDATE_INTERVAL) %
              MINUTE_SYM.PRESENT_PROGRESS.length
          ];
      } else if (h > hours || (h === hours && m > mins)) {
        // futuro
        clockMatrix[h][m] = MINUTE_SYM.FUTURE;
      }
    }
  }

  return clockMatrix;
};

// aggiorna matrice orologio
const updateClock = () => {
  const clockMatrix = generateClockMatrix(new Date());
  const clockElement = document.querySelector("#clock");
  const styles = [];

  const clockString = printClockMatrix(clockMatrix);
  clockElement.innerHTML = clockString;

  // colori e font (?)
  const symbols = clockElement.querySelectorAll("span");
  symbols.forEach((symbol, index) => {
    const textContent = symbol.textContent.trim();
    let foreground, background, fontFamily;

    if (textContent === MINUTE_SYM.PAST || textContent === MINUTE_SYM.FUTURE) {
      foreground = SYMBOL_COLORS.DOT.foreground;
      background = SYMBOL_COLORS.DOT.background;
      fontFamily = "Helvetica";
    } else {
    
    }

    symbol.style.color = foreground;
    symbol.style.backgroundColor = background;
    symbol.style.fontFamily = fontFamily;
  });
};

updateClock();

// aggiorna il display a intervalli regolari
setInterval(() => {
  updateClock();
}, DISPLAY_UPDATE_INTERVAL);