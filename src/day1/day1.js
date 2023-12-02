const { readFileToLines, handleLetterDigits } = require("../utils");

function day1(inputPath) {
  const allLines = readFileToLines(inputPath);
  const digitRegex = /\d|one|two|three|four|five|six|seven|eight|nine/g;
  let sum = 0;

  function findSecondDigit(line) {
    for (let i = 1; i <= line.length; i++) {
      let chunkMatch = line.slice(-i).match(digitRegex);
      if (chunkMatch) {
        return chunkMatch[0];
      }
    }
  }

  for (let line of allLines) {
    let digitMatch = line.match(digitRegex);

    if (digitMatch) {
      let rawFirstDigit = digitMatch[0];
      let rawSecondDigit = findSecondDigit(line);
      let firstDigit = handleLetterDigits(rawFirstDigit);
      let secondDigit = handleLetterDigits(rawSecondDigit);
      sum += Number(firstDigit + secondDigit);
    }
  }

  return sum;
}

console.log(day1("src/day1/input.txt"));

exports.fct1 = day1;
