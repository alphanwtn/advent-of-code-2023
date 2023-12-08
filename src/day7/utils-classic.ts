import { CamelHand } from "./calculate";

export function calculateCardPower(card: string) {
  switch (card) {
    case "2":
      return 0;
    case "3":
      return 1;
    case "4":
      return 2;
    case "5":
      return 3;
    case "6":
      return 4;
    case "7":
      return 5;
    case "8":
      return 6;
    case "9":
      return 7;
    case "T":
      return 8;
    case "J":
      return 9;
    case "Q":
      return 10;
    case "K":
      return 11;
    case "A":
      return 12;
    default:
      return;
  }
}

export function calculateHandPower(hand: string) {
  const splittedHand = hand.split("");
  const sortedCards: any = {};
  let pairNumber = 0;

  for (const card of splittedHand) {
    if (!(card in sortedCards)) {
      sortedCards[card] = 1;
    } else {
      sortedCards[card] += 1;
    }
  }

  for (const [, value] of Object.entries(sortedCards)) {
    if (value === 5) {
      return 6; // five of a kind
    }

    if (value === 4) {
      return 5; // four of a kind
    }
  }

  if (
    (sortedCards[Object.keys(sortedCards)[0]] === 3 &&
      sortedCards[Object.keys(sortedCards)[1]] === 2) ||
    (sortedCards[Object.keys(sortedCards)[0]] === 2 &&
      sortedCards[Object.keys(sortedCards)[1]] === 3)
  ) {
    return 4; // full house
  }

  for (const [, value] of Object.entries(sortedCards)) {
    if (value === 3) {
      return 3; // three of a kind
    }
  }

  for (const [, value] of Object.entries(sortedCards)) {
    if (value === 2) {
      pairNumber += 1;
    }
  }

  if (pairNumber) {
    return pairNumber; // pair or double pair
  }

  return 0; // nada
}

export function compareHandPower(a: CamelHand, b: CamelHand) {
  if (a.power > b.power) {
    return -1;
  } else if (a.power < b.power) {
    return 1;
  } else {
    const firstHand = a.hand.split("");
    const secondHand = b.hand.split("");

    for (let index in firstHand) {
      const firstHandCardPower = calculateCardPower(firstHand[index]);
      const secondHandCardPower = calculateCardPower(secondHand[index]);

      if (
        firstHandCardPower === undefined ||
        secondHandCardPower === undefined
      ) {
        return 0;
      }

      if (firstHandCardPower > secondHandCardPower) {
        return -1;
      } else if (firstHandCardPower < secondHandCardPower) {
        return 1;
      }
    }
  }

  return 0;
}
