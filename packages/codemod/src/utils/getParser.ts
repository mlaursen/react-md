import rawlist from "@inquirer/rawlist";

const parserOptions = [
  { name: "Javascript", value: "babel" },
  { name: "Typescript", value: "tsx" },
] as const;
export const parsers = parserOptions.map(({ value }) => value);
export type Parser = (typeof parsers)[number];

export async function getParser(parser?: string): Promise<string> {
  if (parser) {
    return parser;
  }

  return await rawlist({
    message: "Which dialect of JavaScript do you use?",
    choices: parserOptions,
  });
}
