import { readFileToLines } from "../utils";

class Node {
  name: string;
  left: Node | null;
  right: Node | null;

  constructor(
    name: string,
    left: Node | null = null,
    right: Node | null = null
  ) {
    this.name = name;
    this.left = left;
    this.right = right;
  }
}

// part 1
export function calculate(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  const instructions = allLines.shift()!.split("");
  allLines.shift();

  const allNodes = allLines.map((line) => new Node(line.split(" ")[0]));

  allNodes.forEach((node, index) => {
    const nodeRoutes = allLines[index]
      .split(" = ")[1]
      .replace(/\(|\)/g, "")
      .split(", ");

    const leftNode =
      allNodes.find((node) => node.name === nodeRoutes[0]) ?? null;
    const rightNode =
      allNodes.find((node) => node.name === nodeRoutes[1]) ?? null;

    node.left = leftNode;
    node.right = rightNode;
  });

  let currentNode = allNodes.find((node) => node.name === "AAA")!;
  let instructionIndex = 0;
  let routeCpt = 0;

  while (currentNode.name !== "ZZZ") {
    if (!currentNode.left || !currentNode.right) {
      throw "No routes !!";
    }
    if (instructions[instructionIndex] === "L") {
      currentNode = currentNode.left;
    } else if (instructions[instructionIndex] === "R") {
      currentNode = currentNode.right;
    }

    instructionIndex + 1 < instructions.length
      ? instructionIndex++
      : (instructionIndex = 0);

    routeCpt++;
  }

  return routeCpt;
}

// part 2
// export function calculate2(inputPath: string) {
//   const allLines: string[] = readFileToLines(inputPath);

//   // Enter code here

//   return;
// }

console.log("final return", calculate("src/day8/inputs/input.txt"));
