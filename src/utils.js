function readFileToLines(inputPath) {
  const fs = require("fs");
  const data = fs.readFileSync(inputPath, { encoding: "utf-8", flag: "r" });
  return data.split("\n");
}

function handleLetterDigit(digit) {
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

module.exports = {
  readFileToLines,
  handleLetterDigit,
};
