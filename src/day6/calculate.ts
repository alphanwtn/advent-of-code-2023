import { readFileToLines } from "../utils";

type RaceRecord = { time: number; distance: number };

function calculateDistance(buttonTime: number, raceTime: number) {
  const speed = buttonTime;
  const runTime = raceTime - buttonTime;

  return speed * runTime;
}

// part 1
export function calculate(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  const waysOfWin = [];

  const onlyTimes = allLines[0]
    .split(":")[1]
    .trim()
    .split(/ +/)
    .map((num) => Number(num));

  const onlyDistances = allLines[1]
    .split(":")[1]
    .trim()
    .split(/ +/)
    .map((num) => Number(num));

  const allRaceRecords: RaceRecord[] = onlyTimes.map((time, i) => ({
    time,
    distance: onlyDistances[i],
  }));

  for (let raceRecord of allRaceRecords) {
    let buttonTime = 1;
    let waysCpt = 0;

    while (buttonTime < raceRecord.time) {
      let traveledDistance = calculateDistance(buttonTime, raceRecord.time);

      if (traveledDistance > raceRecord.distance) {
        waysCpt += 1;
      }

      buttonTime++;
    }

    waysOfWin.push(waysCpt);
  }

  const totalWaysOfWin = waysOfWin.reduce((race, acc) => race * acc, 1);

  return totalWaysOfWin;
}

console.log("final return", calculate("src/day6/inputs/input3.txt"));
