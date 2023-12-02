const { readFileToLines, handleLetterDigit } = require("../utils");

function day1(inputPath: string): number {
  const allLines = readFileToLines(inputPath);
  const digitRegex = /\d|one|two|three|four|five|six|seven|eight|nine/g;
  let sum = 0;

  function findRawSecondDigit(line: string): string {
    for (let i = 1; i <= line.length; i++) {
      let chunkMatch = line.slice(-i).match(digitRegex);
      if (chunkMatch) {
        return chunkMatch[0];
      }
    }
    return "";
  }

  for (let line of allLines) {
    let digitMatch = line.match(digitRegex);

    if (digitMatch) {
      let rawFirstDigit = digitMatch[0];
      let rawSecondDigit = findRawSecondDigit(line);
      let firstDigit = handleLetterDigit(rawFirstDigit);
      let secondDigit = handleLetterDigit(rawSecondDigit);

      sum += Number(firstDigit + secondDigit);
    }
  }

  return sum;
}

console.log(day1("src/day1/input.txt"));

exports.fct1 = day1;
