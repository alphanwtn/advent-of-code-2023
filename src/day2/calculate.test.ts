import {
  GameSet,
  calculate,
  calculate2,
  lineToFormattedSet,
} from "./calculate";

test("Should translate 1st set of 1st game into a object", () => {
  expect(lineToFormattedSet("Game 1: 3 blue, 4 red")).toStrictEqual([
    {
      gameId: 1,
      set: 0,
      cubes: { blue: 3, green: 0, red: 4 },
    },
  ] as GameSet[]);
});

test("Should extract all sets for a game into object", () => {
  expect(
    lineToFormattedSet("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")
  ).toStrictEqual([
    {
      gameId: 1,
      set: 0,
      cubes: { blue: 3, green: 0, red: 4 },
    },
    {
      gameId: 1,
      set: 1,
      cubes: { blue: 6, green: 2, red: 1 },
    },
    {
      gameId: 1,
      set: 2,
      cubes: { blue: 0, green: 2, red: 0 },
    },
  ] as GameSet[]);
});

test("1: Should return 3 because game 1 and 2 are ok", () => {
  expect(calculate("src/day2/input2.txt")).toBe(3);
});

test("1: Should return 8 (enoncé)", () => {
  expect(calculate("src/day2/input3.txt")).toBe(8);
});

test("2: Should find the minimum set up for 1 game and find pow", () => {
  expect(calculate2("src/day2/input4.txt")).toBe(48);
});

test("2: Should find the minimum set up for 5 game and find pow and add them", () => {
  expect(calculate2("src/day2/input3.txt")).toBe(2286);
});
