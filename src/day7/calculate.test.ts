import { calculate, calculate2 } from "./calculate";

test("1:", () => {
  expect(calculate("src/day7/inputs/input.txt")).toBe(246795406);
});

test("2:", () => {
  expect(calculate2("src/day7/inputs/input.txt")).toBe(249356515);
});
