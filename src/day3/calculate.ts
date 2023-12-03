import { readFileToLines } from "../utils";
import { EngineNumber, EngineSymbol } from "./classes";
import { linesToEngineNumbers, linesToEngineSymbols } from "./utils";

// part 1
export function calculate(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);

  const engineNumbers = linesToEngineNumbers(allLines);
  const engineSymbols = linesToEngineSymbols(allLines);

  let sum = 0;

  for (let row in engineNumbers) {
    let linesToScan = engineSymbols.filter(
      (symbolLine, i) =>
        i === Number(row) - 1 || i === Number(row) || i === Number(row) + 1
    );

    for (let engineNumber of engineNumbers[row]) {
      sum += engineNumber.scan(linesToScan);
    }
  }

  return sum;
}

// part 2
export function calculate2(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);

  const engineNumbers = linesToEngineNumbers(allLines);
  const engineSymbols = linesToEngineSymbols(allLines);

  let sum = 0;

  for (let row in engineSymbols) {
    let linesToScan = engineNumbers.filter(
      (numberLine, i) =>
        i === Number(row) - 1 || i === Number(row) || i === Number(row) + 1
    );

    for (let engineSymbol of engineSymbols[row]) {
      sum += engineSymbol.scan(linesToScan);
    }
  }

  return sum;
}

console.log("final return", calculate2("src/day3/inputs/input.txt"));
