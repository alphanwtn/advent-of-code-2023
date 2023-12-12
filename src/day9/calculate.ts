import { readFileToLines } from "../utils";

export function lineToExtrapolation(line: string): number {
  const lineHistory = line.split(" ").map((num) => Number(num));
  const draftArrays: number[][] = [lineHistory];

  // step 1
  let inc = 0;
  while (!draftArrays[draftArrays.length - 1].every((num) => num === 0)) {
    let currentDraftArray = draftArrays[inc];
    let nextLine = currentDraftArray
      .map((num, i) => currentDraftArray[i + 1] - num)
      .slice(0, currentDraftArray.length - 1);

    draftArrays.push(nextLine);
    inc++;
  }

  // step2
  draftArrays[draftArrays.length - 1].push(0);

  let ind = draftArrays.length - 1;
  while (ind !== 0) {
    let currentDraftArray = draftArrays[ind];
    let targetDraftArray = draftArrays[ind - 1];

    targetDraftArray.push(
      currentDraftArray[currentDraftArray.length - 1] +
        targetDraftArray[targetDraftArray.length - 1]
    );
    ind--;
  }

  return draftArrays[0][draftArrays[0].length - 1];
}

export function lineToExtrapolationV2(line: string): number {
  const lineHistory = line.split(" ").map((num) => Number(num));
  const draftArrays: number[][] = [lineHistory];

  // step 1
  let inc = 0;
  while (!draftArrays[draftArrays.length - 1].every((num) => num === 0)) {
    let currentDraftArray = draftArrays[inc];
    let nextLine = currentDraftArray
      .map((num, i) => currentDraftArray[i + 1] - num)
      .slice(0, currentDraftArray.length - 1);

    draftArrays.push(nextLine);
    inc++;
  }

  // step2
  draftArrays[draftArrays.length - 1].unshift(0);

  let ind = draftArrays.length - 1;
  while (ind !== 0) {
    let currentDraftArray = draftArrays[ind];
    let targetDraftArray = draftArrays[ind - 1];

    targetDraftArray.unshift(targetDraftArray[0] - currentDraftArray[0]);
    ind--;
  }

  return draftArrays[0][0];
}

// part 1
export function calculate(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  return allLines.reduce((acc, line) => lineToExtrapolation(line) + acc, 0);
}

// part 2
export function calculate2(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  return allLines.reduce((acc, line) => lineToExtrapolationV2(line) + acc, 0);
}

console.log("final return", calculate2("src/day9/inputs/input.txt"));
