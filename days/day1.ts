import text from "./files/day1.txt";

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let regex = new RegExp(`(?=(\\d|${numbers.join("|")}))`, "g");

const getNumber = (value: string = "") => {
  if (numbers.indexOf(value) > -1)
    return (numbers.indexOf(value) + 1).toString();
  return value;
};

let sum = 0;
text
  .split("\n")
  .map((line) => {
    // Find the first and the last digit in the line
    const digits = [...line.matchAll(regex)]
      .map((match) => match[1])
      .map((n) => getNumber(n));

    const first = digits[0];
    const last = digits[digits.length - 1];
    return parseInt(first + last);
  })
  .forEach((code) => {
    sum += code;
  });

console.log("Total:", sum);
