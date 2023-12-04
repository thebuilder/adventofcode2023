import input from "./files/day3.txt";
import validation from "./files/day3-validation.txt";
import chalk from "chalk";

// Regex that matches any symbol (not words and digits), except .
const symbol = /[^.\w\d]/;

function partOne(input: string) {
  const lines = input.split("\n");
  let results: Array<number> = [];
  lines.forEach((line, y) => {
    const indexes: Array<number> = [];
    for (let x = 0; x < line.length; x++) {
      // Find index of digits in the line
      if (line[x].match(/\d/)) {
        // // Scan for surrounding symbols
        for (let i = 0; i < 9; i++) {
          const ix = x + (i % 3) - 1;
          const iy = y + Math.floor(i / 3) - 1;
          const char = lines?.[iy]?.[ix];
          if (char?.match(symbol)) {
            indexes.push(x);
          }
        }
      }
    }

    // Use regex to find the index and lastIndex of all numbers in the line
    const matches = [...line.matchAll(/\d/g)].map((match) => match.index);

    // Go through the indexes and find the numbers
    // Take the value from line, and add it to the results. Start new number of the next index is more than 1
    for (let i = 0; i < line.length; i++) {
      let hasSymbol = false;
      let number = "";
      while (matches.includes(i)) {
        if (indexes.includes(i)) hasSymbol = true;
        number += line[i];
        i++;
      }

      if (hasSymbol) results.push(parseInt(number));
    }
  });

  return results;
}

function partTwo(input: string) {
  let lines = input.split("\n");
  let gearRatios: Array<number> = [];

  const mappedArray = lines.map((line) => line.split(""));

  const findNumberInIndex = (y: number, x: number) => {
    const line = lines[y];
    // Use regex to find the index and lastIndex of all numbers in the line
    const matches = [...line.matchAll(/\d/g)].map((match) => match.index);

    // Go through the indexes and find the numbers
    // Take the value from line, and add it to the results. Start new number of the next index is more than 1
    for (let i = 0; i < line.length; i++) {
      let keep = false;
      let number = "";
      while (matches.includes(i)) {
        if (i === x) {
          keep = true;
          mappedArray[y][i] = chalk.green(mappedArray[y][i]);
        } else {
          mappedArray[y][i] = chalk.yellow(mappedArray[y][i]);
        }
        number += line[i];
        i++;
      }

      if (keep) {
        return parseInt(number);
      }
    }
    return 0;
  };

  const allMatches = [];
  lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      let matches = [];
      // Find index of digits in the line
      const snapshot = [new Array(3), new Array(3), new Array(3)];
      if (line[x].match(/\*/)) {
        // // Scan for surrounding symbols
        mappedArray[y][x] = chalk.red(mappedArray[y][x]);
        for (let i = 0; i < 9; i++) {
          const ix = x + (i % 3) - 1;
          const iy = y + Math.floor(i / 3) - 1;
          const char = lines?.[iy]?.[ix];
          if (char) {
            mappedArray[iy][ix] = chalk.bgGrey(mappedArray[iy][ix]);
          }
          if (char?.match(/\d/)) {
            let lastMatch: { ix: number; iy: number } =
              matches[matches.length - 1];

            const previousChar = lines?.[iy]?.[ix - 1];
            if (
              !lastMatch ||
              lastMatch.iy !== iy ||
              !previousChar.match(/\d/)
            ) {
              mappedArray[iy][ix] = chalk.bgWhite(lines[iy][ix]);
              matches.push({ ix, iy });
            }
          }
        }
      }

      if (matches.length === 2) {
        const digits = matches.map((match) => {
          allMatches.push(match);
          return findNumberInIndex(match.iy, match.ix);
        });
        const ratio = digits.reduce((sum, value) => sum * value, 1);
        gearRatios.push(ratio);
      } else if (matches.length) {
        matches.forEach((match) => {
          mappedArray[match.iy][match.ix] = chalk.bgRed(
            lines[match.iy][match.ix],
          );
        });
      }
    }
  });

  const pretty = [...mappedArray].map((line) => line.join("")).join("\n");
  console.log(pretty);

  return gearRatios;
}
// const output = partOne(input);
// const sum = output.reduce((sum, value) => sum + value, 0);
// console.log({ output, sum });

const output = partTwo(input);
const sum = output.reduce((sum, value) => sum + value, 0);
console.log("Power", sum);
