import { readFileToLines } from "../utils";
import { areConnectables } from "./utils";
const _ = require("lodash");

export enum Cardinals {
  North = "North",
  South = "South",
  East = "East",
  West = "West",
}

// Définir la classe Pipe
export class Pipe {
  symbol: string;
  connections: Cardinals[];
  coords: [number, number];

  constructor(
    symbol: string,
    connections: Cardinals[],
    coords: [number, number]
  ) {
    this.symbol = symbol;
    this.connections = connections;
    this.coords = coords;
  }
}

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
  const pipeMap = pipeStringMap.map((row, irow) =>
    row.map((pipe, icol) => {
      switch (pipe) {
        case "|":
          return new Pipe(
            "|",
            [Cardinals.North, Cardinals.South],
            [irow, icol]
          );
        case "-":
          return new Pipe("-", [Cardinals.East, Cardinals.West], [irow, icol]);
        case "L":
          return new Pipe("L", [Cardinals.North, Cardinals.East], [irow, icol]);
        case "J":
          return new Pipe("J", [Cardinals.North, Cardinals.West], [irow, icol]);
        case "7":
          return new Pipe("7", [Cardinals.South, Cardinals.West], [irow, icol]);
        case "F":
          return new Pipe("F", [Cardinals.South, Cardinals.East], [irow, icol]);
        case "S":
          return new Pipe(
            "S",
            [Cardinals.South, Cardinals.East, Cardinals.North, Cardinals.West],
            [irow, icol]
          );
        default:
          return new Pipe(".", [], [irow, icol]);
      }
    })
  );

  const step = new CurrentStep(pipeMap);

  do {
    let nextPipe = step.findNextRoad();
    if (!nextPipe) {
      console.error("Pas de sol trouvée");
    }

    step.prevPipe = step.currentPipe;
    step.currentPipe = nextPipe;
    step.stepCpt++;

    console.log(step.currentPipe.symbol);
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
