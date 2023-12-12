import { readFileToLines } from "../utils";
import { calculate, calculate2, lineToExtrapolation } from "./calculate";

test("1: Calculate first line extrapolation", () => {
  expect(
    lineToExtrapolation(readFileToLines("src/day9/inputs/input1.txt")[0])
  ).toBe(18);
});

test("1: Calculate same as example", () => {
  expect(calculate("src/day9/inputs/input1.txt")).toBe(114);
});

test("2: Calculate same as example", () => {
  expect(calculate2("src/day9/inputs/input2.txt")).toBe(5);
});
