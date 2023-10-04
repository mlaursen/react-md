import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { type RunnableCodeOptions } from "../../src/components/DangerouslyRunCode/RunnableCodePreview.js";
import { type RunnableCodePreviewOptions } from "../../src/components/DangerouslyRunCode/RunnableCodePreviewContainer.js";
import { assertBoolean, assertString } from "../../src/utils/assertions.js";
import { log } from "./log.js";
import { getDemoCode } from "./typescript.js";

const DEMO_JSON_REGEX = /^{{.+}}$/;

interface ParsedOptions
  extends Required<RunnableCodeOptions>,
    Required<RunnableCodePreviewOptions> {
  importName: string;
}

interface FixOptions extends ParsedOptions {
  isLogged: boolean;
  index: number;
  lines: string[];
  directory: string;
}

async function insertImportedCode(options: FixOptions): Promise<void> {
  const { index, lines, isLogged, directory, importName, card, phone } =
    options;

  const demoFilePath = join(directory, importName);
  const flags = ["preview", "editable", card && "card", phone && "phone"]
    .filter(Boolean)
    .join(" ");
  const demoCode = await log(
    getDemoCode(demoFilePath, directory),
    "",
    isLogged ? `Compiled ${demoFilePath}` : ""
  );

  const formatted = `\`\`\`tsx
// ${flags}
${demoCode}
\`\`\`
`;

  lines[index] = formatted;
}

const parseOptions = (line: string): ParsedOptions => {
  const { component, card, phone, ...others } = JSON.parse(
    line.substring(1, line.length - 1)
  );

  const keys = Object.keys(others);
  if (keys.length) {
    throw new Error(`Unsupported demo props: ${keys.join(", ")}`);
  }

  assertString(component);
  assertBoolean(card, false);
  assertBoolean(phone, false);

  return {
    card,
    phone,
    importName: component,
  };
};

export async function createDemoMarkdown(
  path: string,
  outPath: string,
  isLogged: boolean
): Promise<void> {
  const directory = dirname(path);
  const raw = await readFile(path, "utf8");

  const promises: Promise<void>[] = [];
  const lines = raw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (DEMO_JSON_REGEX.test(line)) {
      promises.push(
        insertImportedCode({
          ...parseOptions(line),
          lines,
          index: i,
          directory,
          isLogged,
        })
      );
    }
  }

  await Promise.all(promises);
  const content = lines.join("\n");
  await writeFile(outPath, content, "utf8");
}
