import { readFileToLines } from "../utils";
import { areConnectables, formatPipeMap } from "./utils";
const _ = require("lodash");

export enum Cardinals {
  North = "North",
  South = "South",
  East = "East",
  West = "West",
}

export type Pipe = {
  symbol: string;
  connections: Cardinals[];
  coords: [number, number];
};

class CurrentStep {
  map: Pipe[][];
  currentPipe: Pipe;
  prevPipe: Pipe | null = null;
  stepCpt: number = 0;

  constructor(map: Pipe[][]) {
    this.map = map;
    this.currentPipe = findAnimalPipe(map)!;
  }

  findNextRoad(): Pipe {
    const currentCoords = this.currentPipe.coords;
    const row = currentCoords[0];
    const col = currentCoords[1];
    const adjacentPipes = [
      col - 1 >= 0 ? this.map[row][col - 1] : undefined,
      col + 1 < this.map[row].length ? this.map[row][col + 1] : undefined,
      row - 1 >= 0 ? this.map[row - 1][col] : undefined,
      row + 1 < this.map.length ? this.map[row + 1][col] : undefined,
    ].filter((pipe) => pipe !== undefined);

    const possibleRoads = adjacentPipes.filter(
      (adjPipe) =>
        areConnectables(this.currentPipe, adjPipe!) && adjPipe !== this.prevPipe
    );

    return possibleRoads[0]!;
  }

  markTile(direction: boolean) {
    const currentCoords = this.currentPipe.coords;
    const row = currentCoords[0];
    const col = currentCoords[1];

    const up = row - 1 >= 0 ? this.map[row - 1][col] : undefined;
    const down = row + 1 < this.map.length ? this.map[row + 1][col] : undefined;
    const left = col - 1 >= 0 ? this.map[row][col - 1] : undefined;
    const right =
      col + 1 < this.map[row].length ? this.map[row][col + 1] : undefined;

    switch (this.currentPipe.symbol) {
      case "|":
        if (direction) {
          right?.symbol === "." ? (right.symbol = "I") : null;
        } else {
          left?.symbol === "." ? (left.symbol = "I") : null;
        }
    }
  }
}

export function findAnimalPipe(pipeMap: Pipe[][]): Pipe | null {
  for (let row in pipeMap) {
    for (let col in pipeMap[row]) {
      if (pipeMap[row][col].symbol === "S") {
        return pipeMap[row][col];
      }
    }
  }

  return null;
}

// part 1
export function calculate(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  const pipeStringMap: string[][] = allLines.map((line) => line.split(""));
  const pipeMap = formatPipeMap(pipeStringMap);
  const step = new CurrentStep(pipeMap);

  do {
    let nextPipe = step.findNextRoad();
    if (!nextPipe) {
      console.error("Pas de sol trouvée");
    }

    step.prevPipe = step.currentPipe;
    step.currentPipe = nextPipe;
    step.stepCpt++;
  } while (step.currentPipe.symbol !== "S");

  return step.stepCpt / 2;
}

// part 2
// export function calculate2(inputPath: string) {
//   const allLines: string[] = readFileToLines(inputPath);

//   // Enter code here

//   return;
// }

console.log("final return", calculate("src/day10/inputs/input.txt"));
