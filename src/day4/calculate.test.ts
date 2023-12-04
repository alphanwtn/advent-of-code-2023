import { readFileToLines } from "../utils";
import {
  ScratchCard,
  calculate,
  calculate2,
  createScratchCard,
} from "./calculate";

test("1: Extract ticket in good format", () => {
  expect(
    createScratchCard(readFileToLines("src/day4/inputs/input1.txt")[0])
  ).toEqual(
    new ScratchCard([41, 48, 83, 86, 17], [83, 86, 6, 31, 17, 9, 48, 53])
  );
});

test("1: Calculate good points for 1 line", () => {
  expect(calculate("src/day4/inputs/input1.txt")).toEqual(8);
});

test("1: Calculate good points for example file", () => {
  expect(calculate("src/day4/inputs/input2.txt")).toEqual(13);
});

test("2: Calculate good ticket number for example file", () => {
  expect(calculate2("src/day4/inputs/input2.txt")).toEqual(30);
});
