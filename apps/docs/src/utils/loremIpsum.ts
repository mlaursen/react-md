import { randomInt } from "@react-md/core";
import { upperFirst } from "lodash";

const words = [
  "ad",
  "adipisicing",
  "aliqua",
  "aliquip",
  "amet",
  "anim",
  "aute",
  "cillum",
  "commodo",
  "consectetur",
  "consequat",
  "culpa",
  "cupidatat",
  "deserunt",
  "do",
  "dolor",
  "dolore",
  "duis",
  "ea",
  "eiusmod",
  "elit",
  "enim",
  "esse",
  "est",
  "et",
  "eu",
  "ex",
  "excepteur",
  "exercitation",
  "fugiat",
  "id",
  "in",
  "incididunt",
  "ipsum",
  "irure",
  "labore",
  "laboris",
  "laborum",
  "Lorem",
  "magna",
  "minim",
  "mollit",
  "nisi",
  "non",
  "nostrud",
  "nulla",
  "occaecat",
  "officia",
  "pariatur",
  "proident",
  "qui",
  "quis",
  "reprehenderit",
  "sint",
  "sit",
  "sunt",
  "tempor",
  "ullamco",
  "ut",
  "velit",
  "veniam",
  "voluptate",
] as const;

const generateSentence = (numberOfWords: number): string => {
  return Array.from({ length: numberOfWords }, (_, i) => {
    const word = words[randomInt({ min: 0, max: words.length - 1 })];
    if (i === 0) {
      return upperFirst(word);
    }

    return word;
  }).join(" ");
};

type Options = { words: number } | { minWords: number; maxWords: number };

export function loremIpsum(options: Options): string {
  const numberOfWords =
    "words" in options
      ? options.words
      : randomInt({ min: options.minWords, max: options.maxWords });

  return generateSentence(numberOfWords);
}
