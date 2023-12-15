import _ from "lodash";
import { Pipe, Cardinals } from "./calculate";

export function areConnectables(pipeA: Pipe, pipeB: Pipe): boolean {
  const pipeARow = pipeA.coords[0];
  const pipeACol = pipeA.coords[1];

  switch (pipeA.symbol) {
    case "|":
      return (
        (_.isEqual(pipeB.coords, [pipeARow - 1, pipeACol]) &&
          pipeB.connections.some((card) => card === Cardinals.South)) ||
        (_.isEqual(pipeB.coords, [pipeARow + 1, pipeACol]) &&
          pipeB.connections.some((card) => card === Cardinals.North))
      );

    case "-":
      return (
        (_.isEqual(pipeB.coords, [pipeARow, pipeACol - 1]) &&
          pipeB.connections.some((card) => card === Cardinals.East)) ||
        (_.isEqual(pipeB.coords, [pipeARow, pipeACol + 1]) &&
          pipeB.connections.some((card) => card === Cardinals.West))
      );

    case "L":
      return (
        (_.isEqual(pipeB.coords, [pipeARow - 1, pipeACol]) &&
          pipeB.connections.some((card) => card === Cardinals.South)) ||
        (_.isEqual(pipeB.coords, [pipeARow, pipeACol + 1]) &&
          pipeB.connections.some((card) => card === Cardinals.West))
      );

    case "J":
      return (
        (_.isEqual(pipeB.coords, [pipeARow - 1, pipeACol]) &&
          pipeB.connections.some((card) => card === Cardinals.South)) ||
        (_.isEqual(pipeB.coords, [pipeARow, pipeACol - 1]) &&
          pipeB.connections.some((card) => card === Cardinals.East))
      );

    case "7":
      return (
        (_.isEqual(pipeB.coords, [pipeARow + 1, pipeACol]) &&
          pipeB.connections.some((card) => card === Cardinals.North)) ||
        (_.isEqual(pipeB.coords, [pipeARow, pipeACol - 1]) &&
          pipeB.connections.some((card) => card === Cardinals.East))
      );

    case "F":
      return (
        (_.isEqual(pipeB.coords, [pipeARow + 1, pipeACol]) &&
          pipeB.connections.some((card) => card === Cardinals.North)) ||
        (_.isEqual(pipeB.coords, [pipeARow, pipeACol + 1]) &&
          pipeB.connections.some((card) => card === Cardinals.West))
      );

    case "S":
      return (
        (_.isEqual(pipeB.coords, [pipeARow + 1, pipeACol]) &&
          pipeB.connections.some((card) => card === Cardinals.North)) ||
        (_.isEqual(pipeB.coords, [pipeARow - 1, pipeACol]) &&
          pipeB.connections.some((card) => card === Cardinals.South)) ||
        (_.isEqual(pipeB.coords, [pipeARow, pipeACol - 1]) &&
          pipeB.connections.some((card) => card === Cardinals.East)) ||
        (_.isEqual(pipeB.coords, [pipeARow, pipeACol + 1]) &&
          pipeB.connections.some((card) => card === Cardinals.West))
      );
    case ".":
    default:
      return false;
  }
}

export function formatPipeMap(stringMap: string[][]) {
  const pipeMap: Pipe[][] = stringMap.map((row, irow) =>
    row.map((pipe, icol) => {
      switch (pipe) {
        case "|":
          return {
            symbol: "|",
            connections: [Cardinals.North, Cardinals.South],
            coords: [irow, icol],
          };
        case "-":
          return {
            symbol: "-",
            connections: [Cardinals.East, Cardinals.West],
            coords: [irow, icol],
          };
        case "L":
          return {
            symbol: "L",
            connections: [Cardinals.North, Cardinals.East],
            coords: [irow, icol],
          };
        case "J":
          return {
            symbol: "J",
            connections: [Cardinals.North, Cardinals.West],
            coords: [irow, icol],
          };
        case "7":
          return {
            symbol: "7",
            connections: [Cardinals.South, Cardinals.West],
            coords: [irow, icol],
          };
        case "F":
          return {
            symbol: "F",
            connections: [Cardinals.South, Cardinals.East],
            coords: [irow, icol],
          };
        case "S":
          return {
            symbol: "S",
            connections: [
              Cardinals.South,
              Cardinals.East,
              Cardinals.North,
              Cardinals.West,
            ],
            coords: [irow, icol],
          };
        default:
          return {
            symbol: ".",
            connections: [],
            coords: [irow, icol],
          };
      }
    })
  );

  return pipeMap;
}
