import { readFileToLines } from "../utils";

export function handleLetterDigit(digit: string): string {
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
      return digit;
  }
}

export function calculate(inputPath: string): number {
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

console.log(calculate("src/day1/inputs/input.txt"));
