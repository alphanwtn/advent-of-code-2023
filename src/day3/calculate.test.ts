import { readFileToLines } from "../utils";
import {
  EngineNumber,
  EngineSymbol,
  calculate,
  calculate2,
  linesToEngineNumbers,
  linesToEngineSymbols,
} from "./calculate";

test("1: Extract all engine numbers with good char", () => {
  const expectedEngNumbers = [
    [new EngineNumber(467, 0, 0, 2), new EngineNumber(114, 0, 5, 7)],
    [],
    [new EngineNumber(35, 2, 2, 3), new EngineNumber(633, 2, 6, 8)],
    [],
  ];

  expect(
    linesToEngineNumbers(readFileToLines("src/day3/inputs/input1.txt"))
  ).toEqual(expectedEngNumbers);
});

test("1: Extract all engine symbols with good char", () => {
  const expectedEngSymbols = [
    [],
    [new EngineSymbol("*", 1, 3)],
    [],
    [new EngineSymbol("#", 3, 6)],
  ];

  expect(
    linesToEngineSymbols(readFileToLines("src/day3/inputs/input1.txt"))
  ).toEqual(expectedEngSymbols);
});

test("1: Calculate the good thing (real engine numbers)", () => {
  expect(calculate("src/day3/inputs/input1.txt")).toBe(1135);
});

test("2: Calculate the good thing (gear ratio)", () => {
  expect(calculate2("src/day3/inputs/input1.txt")).toBe(16345);
});
