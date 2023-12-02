const { fct1 } = require("./day1");

test("Should return 12 if input1", () => {
  expect(fct1("src/day1/input1.txt")).toBe(12);
});

test("Should return 27 if input2", () => {
  expect(fct1("src/day1/input2.txt")).toBe(27);
});

test("Should return 29 if input4", () => {
  expect(fct1("src/day1/input4.txt")).toBe(29);
});

test("Should return 99 if input5", () => {
  expect(fct1("src/day1/input5.txt")).toBe(99);
});

test("Should return 128 if input6", () => {
  expect(fct1("src/day1/input6.txt")).toBe(281);
});

test("Should return 11 if input7", () => {
  expect(fct1("src/day1/input7.txt")).toBe(11);
});
