import { min } from "lodash";
import { readFileToLines } from "../utils";

type MapLine = number[];

export class AlmanacMap {
  mapArrays: MapLine[];

  constructor(mapArrays: MapLine[]) {
    this.mapArrays = mapArrays;
  }

  calculateMapOutput(input: number): number {
    let output = input;

    for (let lineMap of this.mapArrays) {
      const destinationStart = lineMap[0];
      const sourceStart = lineMap[1];
      const rangeLength = lineMap[2];

      if (input >= sourceStart && input < sourceStart + rangeLength) {
        return destinationStart + (input - sourceStart);
      }
    }

    return output;
  }
}

export function extractSeedAndAlmanacMaps(lines: string[]): {
  seeds: number[];
  almanacMaps: AlmanacMap[];
} {
  const seedLine = lines.splice(0, 1)[0];
  const seeds = seedLine
    .split(": ")[1]
    .split(" ")
    .map((num) => Number(num));

  lines.shift(); // delete the empty line after the seed line

  const almanacMaps: AlmanacMap[] = [];
  let mapLines = [];
  let lineOfTitle = true;

  for (let line of lines) {
    let mapLine = [];

    if (lineOfTitle) {
      lineOfTitle = false;
      continue;
    }

    if (line === "") {
      almanacMaps.push(new AlmanacMap([...mapLines]));
      mapLines = [];
      lineOfTitle = true;
      continue;
    }

    mapLine = line.split(" ").map((num) => Number(num));
    mapLines.push([...mapLine]);
  }

  return { seeds, almanacMaps };
}

// part 1
export function calculate(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  const { seeds, almanacMaps } = extractSeedAndAlmanacMaps(allLines);

  const locations: number[] = [];

  for (let seedIndex in seeds) {
    let temporarySeedValue = seeds[seedIndex];

    for (let almanacMap of almanacMaps) {
      temporarySeedValue = almanacMap.calculateMapOutput(temporarySeedValue);
    }

    locations.push(temporarySeedValue);
  }

  return min(locations);
}

// part 2
// export function calculate2(inputPath: string) {
//   const allLines: string[] = readFileToLines(inputPath);

//   // Enter code here

//   return;
// }

console.log("final return", calculate("src/day5/inputs/input.txt"));
