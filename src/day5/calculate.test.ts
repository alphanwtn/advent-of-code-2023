import { readFileToLines } from "../utils";
import { AlmanacMap, calculate, calculate2, extractSeedAndAlmanacMaps } from "./calculate";

test("1: Extract seed all almanacs", () => {
  const almanacMapsSample = {
    seeds: [79, 14, 55, 13],
    almanacMaps: [
      new AlmanacMap([
        [50, 98, 2],
        [52, 50, 48],
      ]),
      new AlmanacMap([
        [0, 15, 37],
        [37, 52, 2],
        [39, 0, 15],
      ]),
    ],
  };
  expect(
    extractSeedAndAlmanacMaps(readFileToLines("src/day5/inputs/input1.txt"))
  ).toEqual(almanacMapsSample);
});

test("1: Calculate good value for example", () => {
  expect(calculate("src/day5/inputs/input2.txt")).toEqual(35);
});

test("2: Calculate good value for example", () => {
  expect(calculate2("src/day5/inputs/input2.txt")).toEqual(46);
});
