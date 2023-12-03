import { calculate } from "./calculate";

test("Should return 12 if input1 ", () => {
  expect(calculate("src/day1/inputs/input1.txt")).toBe(12);
});

test("Should return 27 if input2", () => {
  expect(calculate("src/day1/inputs/input2.txt")).toBe(27);
});

test("Should return 29 if input4", () => {
  expect(calculate("src/day1/inputs/input4.txt")).toBe(29);
});

test("Should return 99 if input5", () => {
  expect(calculate("src/day1/inputs/input5.txt")).toBe(99);
});

test("Should return 128 if input6", () => {
  expect(calculate("src/day1/inputs/input6.txt")).toBe(281);
});

test("Should return 11 if input7", () => {
  expect(calculate("src/day1/inputs/input7.txt")).toBe(11);
});
