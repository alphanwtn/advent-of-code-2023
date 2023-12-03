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
