import { readFileToLines } from "../utils";

export class EngineNumber {
  value: number;
  row: number;
  firstDigitColumn: number;
  lastDigitColumn: number;

  constructor(
    value: number,
    row: number,
    firstDigitColumn: number,
    lastDigitColumn: number
  ) {
    this.value = value;
    this.row = row;
    this.firstDigitColumn = firstDigitColumn;
    this.lastDigitColumn = lastDigitColumn;
  }

  scan(linesSymbolToScan: EngineSymbol[][]): number {
    let scanResult = 0;

    linesSymbolToScan.forEach((line) =>
      line.forEach((symbol) => {
        if (
          symbol.column >= this.firstDigitColumn - 1 &&
          symbol.column <= this.lastDigitColumn + 1
        ) {
          scanResult = this.value;
        }
      })
    );
    return scanResult;
  }
}

export class EngineSymbol {
  value: string;
  row: number;
  column: number;

  constructor(value: string, row: number, column: number) {
    this.value = value;
    this.row = row;
    this.column = column;
  }

  scan(linesNumberToScan: EngineNumber[][]): number {
    let scanResult = 0;
    let gearList: number[] = [];

    linesNumberToScan.forEach((line) =>
      line.forEach((number) => {
        if (
          this.column >= number.firstDigitColumn - 1 &&
          this.column <= number.lastDigitColumn + 1
        ) {
          gearList.push(number.value);
        }
      })
    );

    if (gearList.length === 2) {
      scanResult = gearList[0] * gearList[1];
    }

    return scanResult;
  }
}

export function linesToEngineNumbers(lines: string[]): EngineNumber[][] {
  const allEngNumberFinal: any[] = [];

  for (let row in lines) {
    let matchIterator = lines[row].matchAll(/\d+/g);

    allEngNumberFinal.push([]);

    for (let match of matchIterator) {
      allEngNumberFinal[row].push(
        new EngineNumber(
          Number(match[0]),
          Number(row),
          Number(match.index),
          match.index! + match[0].length - 1
        )
      );
    }
  }

  return allEngNumberFinal;
}

export function linesToEngineSymbols(lines: string[]): EngineSymbol[][] {
  const allEngSymbolFinal: any[] = [];

  for (let row in lines) {
    let matchIterator = lines[row].matchAll(/[^.\w]/g);

    allEngSymbolFinal.push([]);

    for (let match of matchIterator) {
      allEngSymbolFinal[row].push(
        new EngineSymbol(match[0], Number(row), Number(match.index))
      );
    }
  }

  return allEngSymbolFinal;
}

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
