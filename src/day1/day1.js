function fct1(inputPath) {
  const { readFileToLines } = require("../utils");
  const allLines = readFileToLines(inputPath);

  const digitRegex = /\d|one|two|three|four|five|six|seven|eight|nine/g;
  let sum = 0;

  function handleLetterDigits(digit) {
    switch (digit) {
      case "one":
        return "1";
      case "two":
        return "2";
      case "three":
        return "3";
      case "four":
        return "4";
      case "five":
        return "5";
      case "six":
        return "6";
      case "seven":
        return "7";
      case "eight":
        return "8";
      case "nine":
        return "9";
      default:
        return String(digit);
    }
  }

  for (let line of allLines) {
    let digitMatch = line.match(digitRegex);

    if (digitMatch) {
      let firstDigit = handleLetterDigits(digitMatch[0]);
      let secondDigit = handleLetterDigits(digitMatch[digitMatch.length - 1]);
      sum += Number(firstDigit + secondDigit);
    } else {
      continue;
    }
  }

  return sum;
}

console.log(fct1("src/day1/input.txt"));

exports.fct1 = fct1;
