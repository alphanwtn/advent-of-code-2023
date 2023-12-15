import { calculate } from "./calculate";

test("1: First example", () => {
  expect(calculate("src/day10/inputs/input1.txt")).toBe(4);
});

test("1: Second example", () => {
  expect(calculate("src/day10/inputs/input2.txt")).toBe(8);
});
