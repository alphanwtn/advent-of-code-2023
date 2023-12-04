import { readFileToLines } from "../utils";

export class ScratchCard {
  winningNumbers: number[];
  obtainedNumber: number[];
  copies: number = 1;

  constructor(winningNumbers: number[], obtainedNumber: number[]) {
    this.winningNumbers = winningNumbers;
    this.obtainedNumber = obtainedNumber;
  }

  calculatePoints(): number {
    let matchesNumber = 0;
    this.winningNumbers.forEach((num) => {
      if (this.obtainedNumber.includes(num)) {
        matchesNumber += 1;
      }
    });

    return matchesNumber > 0 ? 2 ** (matchesNumber - 1) : 0;
  }

  calculateRealPoints(): number {
    let matchesNumber = 0;
    this.winningNumbers.forEach((num) => {
      if (this.obtainedNumber.includes(num)) {
        matchesNumber += 1;
      }
    });

    return matchesNumber;
  }

  addCopy(copyAmount: number) {
    this.copies += copyAmount;
  }
}

export function createScratchCard(line: string) {
  const splitedIdAndNumbers = line.split(":");
  const splitedNumberTypes = splitedIdAndNumbers[1].split("|");
  const winningNumbers = splitedNumberTypes[0]
    .trim()
    .split(/ +/)
    .map((num) => Number(num));
  const obtainedNumbers = splitedNumberTypes[1]
    .trim()
    .split(/ +/)
    .map((num) => Number(num));

  return new ScratchCard(winningNumbers, obtainedNumbers);
}

// part 1
export function calculate(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  const allCards = allLines.map((line) => createScratchCard(line));

  return allCards.reduce((acc, card) => acc + card.calculatePoints(), 0);
}

// part 2
export function calculate2(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  const allCards = allLines.map((line) => createScratchCard(line));

  allCards.forEach((card, cardIndex) => {
    const matchNumber = card.calculateRealPoints();

    if (matchNumber > 0) {
      for (let i = 1; i <= matchNumber; i++) {
        allCards[i + cardIndex].addCopy(allCards[cardIndex].copies);
      }
    }
  });

  return allCards.reduce((acc, card) => acc + card.copies, 0);
}

console.log("final return", calculate2("src/day4/inputs/input.txt"));
