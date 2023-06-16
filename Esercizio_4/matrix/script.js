// Symbols to represent a minute, past, present, and future
const MINUTE_SYM = {
  PAST: ".  ", // '⬛ ',
  FUTURE: "*  ", // '⬜ ',
  PRESENT: "X  ", // '🔲 ',
  PRESENT_PROGRESS: ["˺", "˼", "˻", "˹"].map(c => c + "  ") 
};

// What time to start the clock display. Can be set with the `sh` query
// param. Defaults to 0
const startHourQuery = location.search.match(/\?.*(sh)=(\d{1,2})/);
const START_HOUR = startHourQuery ? parseInt(startHourQuery[2]) : 0;

// How often to update the display in milliseconds
const DISPLAY_UPDATE_INTERVAL = 1000;

// Just in case we ever switch to metric time ;-)
const HOURS_IN_DAY = 24;
const MINS_IN_HOUR = 60;

// Prefix targetNum with zeros up to the specified digits
const zeroPad = (targetNum, digits) =>
  "0".repeat(digits - String(targetNum).length) + targetNum;

// Display the clock matrix. Hours vertically, minutes horizontally.
const printClockMatrix = cm => {
  // Calculate column width and row height
  const columnWidth = 3; // Decreased by one third
  const rowHeight = 3; // Increased by one

  // Hour labels
  let clockString = " ".repeat(columnWidth);
  for (let mins = 0; mins < MINS_IN_HOUR; ++mins) {
    const minuteLabel = zeroPad(mins, 2);
    clockString += minuteLabel + " ".repeat(columnWidth - minuteLabel.length);
  }
  clockString += "\n";

  // Minute rows
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

// Generate a clock matrix for the current date
const generateClockMatrix = date => {
  const hours = (date.getHours() + HOURS_IN_DAY - START_HOUR) % HOURS_IN_DAY;
  const mins = date.getMinutes();
  const secs = date.getSeconds();
  const ms = date.getMilliseconds();

  // Clock matrix. row:column -> hour:minute
  const clockMatrix = new Array(HOURS_IN_DAY);
  for (let h = 0; h < HOURS_IN_DAY; ++h) {
    clockMatrix[h] = new Array(MINS_IN_HOUR);
    for (let m = 0; m < MINS_IN_HOUR; ++m) {
      // Past
      if (h < hours || (h === hours && m < mins)) {
        clockMatrix[h][m] = MINUTE_SYM.PAST;
      } else if (h === hours && m === mins) {
        // Present
        clockMatrix[h][m] =
          MINUTE_SYM.PRESENT_PROGRESS[
            Math.floor((secs * 1000 + ms) / DISPLAY_UPDATE_INTERVAL) %
              MINUTE_SYM.PRESENT_PROGRESS.length
          ];
      } else if (h > hours || (h === hours && m > mins)) {
        // Future
        clockMatrix[h][m] = MINUTE_SYM.FUTURE;
      }
    }
  }

  return clockMatrix;
};

// Update matrix clock
const updateClock = () => {
  const clockMatrix = generateClockMatrix(new Date());
  const clockElement = document.querySelector("#clock");
  const styles = [];

  const clockString = printClockMatrix(clockMatrix);
  clockElement.innerHTML = clockString;

  // Apply colors and font
  const symbols = clockElement.querySelectorAll("span");
  symbols.forEach((symbol, index) => {
    const textContent = symbol.textContent.trim();
    let foreground, background, fontFamily;

    if (textContent === MINUTE_SYM.PAST || textContent === MINUTE_SYM.FUTURE) {
      foreground = SYMBOL_COLORS.DOT.foreground;
      background = SYMBOL_COLORS.DOT.background;
      fontFamily = "Helvetica";
    } else {
      foreground = "#FF0000"; // Red color
      background = "#FFFFFF"; // White color
      fontFamily = "Helvetica";
    }

    symbol.style.color = foreground;
    symbol.style.backgroundColor = background;
    symbol.style.fontFamily = fontFamily;
  });
};

updateClock();

// Update display at a regular interval
setInterval(() => {
  updateClock();
}, DISPLAY_UPDATE_INTERVAL);