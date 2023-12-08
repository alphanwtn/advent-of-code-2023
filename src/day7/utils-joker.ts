import { CamelHand } from "./calculate";
import { calculateHandPower } from "./utils-classic";

export function calculateCardPowerJokerRules(card: string) {
  switch (card) {
    case "2":
      return 1;
    case "3":
      return 2;
    case "4":
      return 3;
    case "5":
      return 4;
    case "6":
      return 5;
    case "7":
      return 6;
    case "8":
      return 7;
    case "9":
      return 8;
    case "T":
      return 9;
    case "J":
      return 0;
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

export function calculateHandPowerJokerRules(hand: string) {
  if (!hand.includes("J")) {
    return calculateHandPower(hand);
  }

  const sortedCards: any = {};
  const splittedHand = hand.split("");
  const handWOJokers = splittedHand.filter((card) => card !== "J");
  const numberOfJokers = 5 - handWOJokers.length;
  const regularCards = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "Q",
    "K",
    "A",
  ];

  for (const card of splittedHand) {
    if (!(card in sortedCards)) {
      sortedCards[card] = 1;
    } else {
      sortedCards[card] += 1;
    }
  }

  if (numberOfJokers === 5 || numberOfJokers === 4) {
    return 6; // always five of a kind
  }

  if (numberOfJokers === 3) {
    let maxHandPower = 0;
    let tempHandPower = 0;

    for (let replaceCard1 of regularCards) {
      for (let replaceCard2 of regularCards) {
        for (let replaceCard3 of regularCards) {
          let tempHand = [...handWOJokers];

          tempHand.push(replaceCard1);
          tempHand.push(replaceCard2);
          tempHand.push(replaceCard3);

          tempHandPower = calculateHandPower(tempHand.join(""));
          maxHandPower =
            tempHandPower > maxHandPower ? tempHandPower : maxHandPower;
        }
      }
    }

    return maxHandPower;
  }

  if (numberOfJokers === 2) {
    let maxHandPower = 0;
    let tempHandPower = 0;

    for (let replaceCard1 of regularCards) {
      for (let replaceCard2 of regularCards) {
        let tempHand = [...handWOJokers];

        tempHand.push(replaceCard1);
        tempHand.push(replaceCard2);

        tempHandPower = calculateHandPower(tempHand.join(""));
        maxHandPower =
          tempHandPower > maxHandPower ? tempHandPower : maxHandPower;
      }
    }

    return maxHandPower;
  }

  if (numberOfJokers === 1) {
    let maxHandPower = 0;
    let tempHandPower = 0;

    for (let replaceCard1 of regularCards) {
      let tempHand = [...handWOJokers];

      tempHand.push(replaceCard1);

      tempHandPower = calculateHandPower(tempHand.join(""));
      maxHandPower =
        tempHandPower > maxHandPower ? tempHandPower : maxHandPower;
    }

    return maxHandPower;
  }

  return 0;
}

export function compareHandPowerJokerRules(a: CamelHand, b: CamelHand) {
  if (a.power > b.power) {
    return -1;
  } else if (a.power < b.power) {
    return 1;
  } else {
    const firstHand = a.hand.split("");
    const secondHand = b.hand.split("");

    for (let index in firstHand) {
      const firstHandCardPower = calculateCardPowerJokerRules(firstHand[index]);
      const secondHandCardPower = calculateCardPowerJokerRules(
        secondHand[index]
      );

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
