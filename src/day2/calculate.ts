import { readFileToLines } from "../utils";

export type GameSet = {
  gameId: number;
  set: number;
  cubes: {
    blue: number;
    green: number;
    red: number;
  };
};

export function lineToFormattedSet(line: string): GameSet[] {
  const formattedGameSets: GameSet[] = [];

  const splitedLine = line.split(": ");
  const gameId = Number(splitedLine[0].split(" ")[1]);
  const gameSets = splitedLine[1].split("; ");

  for (let setIndex in gameSets) {
    const currentGameSet: GameSet = {
      gameId,
      set: Number(setIndex),
      cubes: {
        blue: 0,
        green: 0,
        red: 0,
      },
    };

    const cubesInSet = gameSets[setIndex].split(", ");

    for (let cubeEntry of cubesInSet) {
      let [numberOfCubes, colorOfCubes] = cubeEntry.split(" ");

      if (colorOfCubes === "blue") {
        currentGameSet.cubes["blue"] = Number(numberOfCubes);
      }
      if (colorOfCubes === "green") {
        currentGameSet.cubes["green"] = Number(numberOfCubes);
      }
      if (colorOfCubes === "red") {
        currentGameSet.cubes["red"] = Number(numberOfCubes);
      }
    }

    formattedGameSets.push({ ...currentGameSet });
  }

  return formattedGameSets;
}

export function calculate(inputPath: string) {
  const allGames: string[] = readFileToLines(inputPath);

  const referenceBag: Pick<GameSet, "cubes"> = {
    cubes: { blue: 14, green: 13, red: 12 },
  };

  let gameSum = 0;

  for (let gameLine of allGames) {
    console.log(gameLine);
    let extractedGameSets = lineToFormattedSet(gameLine);

    if (
      extractedGameSets.every(
        (gameSet) =>
          gameSet.cubes.blue <= referenceBag.cubes.blue &&
          gameSet.cubes.green <= referenceBag.cubes.green &&
          gameSet.cubes.red <= referenceBag.cubes.red
      )
    ) {
      gameSum += extractedGameSets[0].gameId;
    }
  }

  console.log(gameSum);
  return gameSum;
}

export function calculate2(inputPath: string) {
  const allGames: string[] = readFileToLines(inputPath);

  let gameSum = 0;

  for (let gameLine of allGames) {
    let minSetup = { blue: 0, green: 0, red: 0 };
    let extractedGameSets = lineToFormattedSet(gameLine);

    for (let gameSet of extractedGameSets) {
      if (gameSet.cubes.blue > minSetup.blue) {
        minSetup.blue = gameSet.cubes.blue;
      }

      if (gameSet.cubes.green > minSetup.green) {
        minSetup.green = gameSet.cubes.green;
      }

      if (gameSet.cubes.red > minSetup.red) {
        minSetup.red = gameSet.cubes.red;
      }
    }

    gameSum += minSetup.red * minSetup.green * minSetup.blue;
  }

  return gameSum;
}

console.log(calculate2("src/day2/input.txt"));
