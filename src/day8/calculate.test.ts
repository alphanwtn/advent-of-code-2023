import { calculate, calculate2, calculate3 } from "./calculate";

test("1:", () => {
  expect(calculate("src/day8/inputs/input1.txt")).toBe(2);
});

test("1:", () => {
  expect(calculate("src/day8/inputs/input2.txt")).toBe(6);
});

test("2: Brute", () => {
  expect(calculate2("src/day8/inputs/input3.txt")).toBe(6);
});

// test("2: Efficient", () => {
//   expect(calculate3("src/day8/inputs/input3.txt")).toBe(6);
// });
