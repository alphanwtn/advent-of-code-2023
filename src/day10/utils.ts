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
