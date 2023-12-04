import input from "./files/day2-input.txt";

function getDraws(draw: string) {
  // Split the string, like '"1 green", "2 red", "1 blue"' into an object by color
  const colors: Record<string, number> = { red: 0, green: 0, blue: 0 };

  draw
    .trim()
    .split(", ")
    .forEach((part) => {
      const [, amount, color] = part.match(/(\d+) (.+)/) ?? [];
      colors[color] += parseInt(amount);
    }, {});

  return colors;
}

function prepareInput(input: string) {
  return input.split("\n").map((line) => {
    const [, id, rest] = line.match(/Game (\d+): (.+)/) ?? [];
    const bag = rest.split(";").map(getDraws);
    const highestDraw = {
      red: Math.max(...bag.map((draw) => draw.red)),
      green: Math.max(...bag.map((draw) => draw.green)),
      blue: Math.max(...bag.map((draw) => draw.blue)),
    };

    return { id: parseInt(id), bag, highestDraw };
  });
}

function filterGamesByMax(
  input: string,
  bagContent: { red: number; green: number; blue: number },
) {
  const games = prepareInput(input);
  return games.filter((game) => {
    return (
      game.highestDraw.red <= bagContent.red &&
      game.highestDraw.green <= bagContent.green &&
      game.highestDraw.blue <= bagContent.blue
    );
  });
}

function calculatePower(input: string) {
  const games = prepareInput(input);
  return games.map((game) => {
    return (
      game.highestDraw.red * game.highestDraw.green * game.highestDraw.blue
    );
  });
}

const part1 = filterGamesByMax(input, { red: 12, green: 13, blue: 14 });
const sum1 = part1.reduce((sum, game) => sum + game.id, 0);

const part2 = calculatePower(input);
const sum2 = part2.reduce((sum, value) => sum + value, 0);
console.log({ sum1, sum2 });
