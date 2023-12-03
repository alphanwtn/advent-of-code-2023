import { EngineNumber, EngineSymbol } from "./classes";

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
