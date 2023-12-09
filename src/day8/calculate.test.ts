import { calculate } from "./calculate";

test("1:", () => {
  expect(calculate("src/day8/inputs/input1.txt")).toBe(2);
});

test("1:", () => {
  expect(calculate("src/day8/inputs/input2.txt")).toBe(6);
});
