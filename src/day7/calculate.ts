import { readFileToLines } from "../utils";
import { calculateHandPower, compareHandPower } from "./utils-classic";
import {
  calculateHandPowerJokerRules,
  compareHandPowerJokerRules,
} from "./utils-joker";

export class CamelHand {
  hand: string;
  bet: number;
  power: number; // type de combinaison 0 c'est rien 1 une pair etc... til 6
  rank: number | null = null;

  constructor(hand: string, bet: number, jokerRules?: boolean) {
    this.hand = hand;
    this.bet = bet;
    this.power = jokerRules
      ? calculateHandPowerJokerRules(hand)
      : calculateHandPower(hand);
  }
}

// part 1
export function calculate(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  const allHands: CamelHand[] = allLines.map(
    (line) => new CamelHand(line.split(" ")[0], Number(line.split(" ")[1]))
  );

  allHands.sort(compareHandPower);
  allHands.forEach((hand, index) => (hand.rank = allHands.length - index));

  return allHands.reduce((acc, hand) => hand.rank! * hand.bet + acc, 0);
}

//part 2
export function calculate2(inputPath: string) {
  const allLines: string[] = readFileToLines(inputPath);
  const allHands: CamelHand[] = allLines.map(
    (line) =>
      new CamelHand(line.split(" ")[0], Number(line.split(" ")[1]), true)
  );

  allHands.sort(compareHandPowerJokerRules);
  allHands.forEach((hand, index) => (hand.rank = allHands.length - index));

  return allHands.reduce((acc, hand) => hand.rank! * hand.bet + acc, 0);
}

console.log(
  "final return 1 : 246795406",
  calculate("src/day7/inputs/input.txt")
);

console.log("final return 2", calculate2("src/day7/inputs/input.txt"));
