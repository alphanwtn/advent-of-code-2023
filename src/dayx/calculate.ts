import { readFileToLines } from "../utils";

// part 1
export function calculate(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);

  // Enter code here

  return;
}

// part 2
// export function calculate2(inputPath: string) {
//   const allLines: string[] = readFileToLines(inputPath);

//   // Enter code here

//   return;
// }

console.log("final return", calculate("src/dayX/inputs/input1.txt"));
