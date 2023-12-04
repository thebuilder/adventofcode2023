import input from "./files/day4.txt";
import validation from "./files/day4-validation.txt";

function numbersToArray(numbers: string) {
  return numbers
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((n) => parseInt(n));
}

function prepareInput(input: string) {
  return input.split("\n").map((line) => {
    const [winning, have] = line.split(":")[1].split("|");

    return { winning: numbersToArray(winning), have: numbersToArray(have) };
  });
}

function part1(text: string) {
  const cards = prepareInput(text);
  // Find the winning numbers that are drawn
  const drawnNumbers = cards.map((card) => {
    return card.have.filter((number) => card.winning.includes(number));
  });

  const points = drawnNumbers.map((draw) => {
    return draw.reduce((sum, draw) => (sum ? sum * 2 : 1), 0);
  });

  // Sum the values of the points
  return points.reduce((sum, points) => sum + points, 0);
}

const scoreCard = (
  card: { winning: number[]; have: number[] },
  index: number,
  allCards: { winning: number[]; have: number[] }[],
) => {
  const matches = card.have.filter((number) => card.winning.includes(number));
  let cards = [index];
  for (let i = index + 1; i <= matches.length + index; i++) {
    if (i < allCards.length) {
      cards = [...cards, ...scoreCard(allCards[i], i, allCards)];
    }
  }

  return cards;
};

function part2(text: string) {
  const cards = prepareInput(text);
  // Find the winning numbers that are drawn
  const totalCards = cards.map((card, index) => {
    return scoreCard(card, index, cards);
  });

  return totalCards.reduce((sum, points) => sum + points.length, 0);
}

console.log("part 1:", part1(input));
console.log("part 2:", part2(input));
