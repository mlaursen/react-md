import { format } from "prettier";
import { type ItemExample } from "sassdoc";

import { compileScss } from "./compileScss.js";
import {
  END_NO_COMPILE,
  NO_COMPILE_TOKEN,
  START_NO_COMPILE,
} from "./constants.js";
import { formatDescription } from "./formatDescription.js";
import { type CompiledExample } from "./types.js";

interface CompiledExampleOptions {
  src: string;
  path: string;
  name: string;
  code: string;
}

async function compileExampleCode({
  src,
  name,
  path,
  code,
}: CompiledExampleOptions): Promise<string> {
  try {
    const scss = `@use "${path}";
`;

    const css = compileScss({
      src,
      scss,
      path,
      getCurrentPathContents: (contents) => `${contents}\n\n${code}`,
    });

    return await format(css, { parser: "css" });
  } catch (e) {
    console.error("Unable to compile an example with the following code:");
    console.error(code);
    console.error();
    console.error("path:", path);
    console.error("name:", name);
    if (e instanceof Error) {
      console.error(e);
    }

    process.exit(1);
  }
}

function removeUncompilableCode(code: string): string {
  let startIndex = code.indexOf(START_NO_COMPILE);
  let endIndex = code.indexOf(END_NO_COMPILE);
  while (startIndex !== -1 && endIndex !== -1) {
    const whitespace = code.match(/\s*\/\/ START_NO_COMPILE/);
    const whitespaceCount = whitespace ? whitespace[0].indexOf("/") : 0;
    code = `${code.substring(0, startIndex - whitespaceCount)}${code.substring(
      endIndex + END_NO_COMPILE.length + 1
    )}`;
    startIndex = code.indexOf(START_NO_COMPILE);
    endIndex = code.indexOf(END_NO_COMPILE);
  }

  return code;
}

export interface FormatExamplesOptions {
  src: string;
  name: string;
  path: string;
  examples: readonly ItemExample[] | undefined;
}

export async function formatExamples({
  src,
  name,
  path,
  examples,
}: FormatExamplesOptions): Promise<readonly CompiledExample[] | undefined> {
  if (!examples?.length) {
    return;
  }

  return await Promise.all(
    examples.map(async ({ code: rawCode, type, description = "" }) => {
      const code = removeUncompilableCode(rawCode);

      let compiled: string | undefined;
      if (type === "scss" && !description.includes(NO_COMPILE_TOKEN)) {
        compiled = await compileExampleCode({
          src,
          code,
          name,
          path,
        });
      }

      const formattedExampleCode = await format(
        `@use "@react-md/core";

${code}
`,
        { parser: "scss" }
      );

      return {
        code: formattedExampleCode,
        compiled,
        type,
        description: formatDescription(description),
      };
    })
  );
}
