import rawlist from "@inquirer/rawlist";

import { type Parser } from "./types.js";

const parserOptions = [
  { name: "Javascript", value: "babel" },
  { name: "Typescript", value: "tsx" },
] as const;
export const parsers = parserOptions.map(({ value }) => value);

export async function getParser(parser?: string): Promise<Parser> {
  if (parser && parser.includes(parser)) {
    return parser as Parser;
  }

  return await rawlist({
    message: "Which dialect of JavaScript do you use?",
    choices: parserOptions,
  });
}
