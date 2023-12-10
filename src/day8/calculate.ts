import { readFileToLines } from "../utils";

class Node {
  name: string;
  left: Node | null;
  right: Node | null;
  state: { cpt: number; instructionIndex: number };

  constructor(
    name: string,
    left: Node | null = null,
    right: Node | null = null
  ) {
    this.name = name;
    this.left = left;
    this.right = right;
    this.state = { cpt: 0, instructionIndex: 0 };
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
  executeNode(/ZZZ/, currentNode, instructions);

  return currentNode.state.cpt;
}

// part 2
export function calculate2(inputPath: string) {
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

  let currentNodes = allNodes.filter((node) => node.name.match(/..A/))!;
  let instructionIndex = 0;
  let routeCpt = 0;

  // console.log(currentNodes);

  while (!currentNodes.every((node) => node.name.match(/..Z/))) {
    if (instructions[instructionIndex] === "L") {
      currentNodes = currentNodes.map((node) => node.left!);
    } else if (instructions[instructionIndex] === "R") {
      currentNodes = currentNodes.map((node) => node.right!);
    }

    instructionIndex + 1 < instructions.length
      ? instructionIndex++
      : (instructionIndex = 0);

    routeCpt++;
  }

  return routeCpt;
}

// part 2 bis
export function calculate3(inputPath: string) {
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

  let currentNodes = allNodes.filter((node) => node.name.match(/..A/))!;
  let calculNodeIndex = 0;
  let maxCpt = 0;

  while (
    !currentNodes.every(
      (node, index) =>
        node.name.match(/..Z/) && node.state.cpt === currentNodes[0].state.cpt
    )
  ) {
    while (currentNodes[calculNodeIndex].state.cpt <= maxCpt) {
      if (calculNodeIndex === 0) {
        currentNodes[calculNodeIndex] = executeNode(
          /..Z/,
          currentNodes[calculNodeIndex],
          instructions
        );
      } else {
        currentNodes[calculNodeIndex] = forceExecuteNode(
          currentNodes[calculNodeIndex],
          instructions
        );
      }
      console.log("waiiit", currentNodes[calculNodeIndex]);
    }

    maxCpt = currentNodes[calculNodeIndex].state.cpt;

    console.log(calculNodeIndex);

    if (calculNodeIndex === 0) {
      calculNodeIndex++;
    } else {
      const prevNodes = currentNodes.slice(0, calculNodeIndex);

      for (let index in prevNodes) {
        while (
          prevNodes[index].state.cpt < currentNodes[calculNodeIndex].state.cpt
        ) {
          prevNodes[index] = forceExecuteNode(prevNodes[index], instructions);
        }
      }

      // prevNodes.forEach((node, index) => {
      //   while (
      //     prevNodes[index].state.cpt < currentNodes[calculNodeIndex].state.cpt
      //   ) {
      //     prevNodes[index] = forceExecuteNode(prevNodes[index], instructions);
      //   }

      //   console.log("ptiinn");
      // });

      currentNodes = [...prevNodes, ...currentNodes.slice(calculNodeIndex)];

      const subNodes = currentNodes.slice(0, calculNodeIndex + 1);

      if (subNodes.every((node) => node.name.match(/..Z/))) {
        calculNodeIndex++;
      } else {
        calculNodeIndex = 0;
      }
    }
    console.log(currentNodes);
  }

  return currentNodes;
}

function forceExecuteNode(node: Node, instructions: string[]) {
  console.log("bef");

  return executeNode(/notused/, node, instructions, true);
}

function executeNode(
  matchRegex: RegExp,
  node: Node,
  instructions: string[],
  forceOnce?: boolean
) {
  while (!node.name.match(matchRegex) || forceOnce) {
    if (!node.left || !node.right) {
      throw "No routes !!";
    }
    if (instructions[node.state.instructionIndex] === "L") {
      node.left.state = node.state;
      node = node.left;
    } else if (instructions[node.state.instructionIndex] === "R") {
      node.right.state = node.state;
      node = node.right;
    }

    node.state.instructionIndex + 1 < instructions.length
      ? node.state.instructionIndex++
      : (node.state.instructionIndex = 0);

    node.state.cpt++;

    // return node;

    if (forceOnce) {
      return node;
    }
  }

  return node;
}

console.log("final return", calculate3("src/day8/inputs/input3.txt"));
