import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import prettyMilliseconds from "pretty-ms";
import { type RunnableCodePreviewOptions } from "../../src/components/DangerouslyRunCode/RunnableCodePreviewContainer.js";
import { getDemoCode } from "./typescript.js";

const DEMO_JSON_REGEX = /^{{.+}}$/;

interface FixOptions extends RunnableCodePreviewOptions {
  watch: boolean;
  index: number;
  lines: string[];
  directory: string;
  importName: string;
}

async function insertImportedCode(options: FixOptions): Promise<void> {
  const { index, lines, watch, directory, importName, card, phone } = options;
  const demoFilePath = join(directory, importName);
  const start = Date.now();
  const flags = ["preview", "editable", card && "card", phone && "phone"]
    .filter(Boolean)
    .join(" ");

  const formatted = `\`\`\`tsx
// ${flags}
${await getDemoCode(demoFilePath, directory)}
\`\`\`
`;

  if (watch) {
    const duration = Date.now() - start;
    console.log(
      ` ✓ Compiled ${demoFilePath} in ${prettyMilliseconds(duration)}`
    );
  }
  lines[index] = formatted;
}

export async function createDemoMarkdown(
  path: string,
  outPath: string,
  watch: boolean
): Promise<void> {
  const directory = dirname(path);
  const raw = await readFile(path, "utf8");

  const promises: Promise<void>[] = [];
  const lines = raw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (DEMO_JSON_REGEX.test(line)) {
      const { component, card, phone, ...others } = JSON.parse(
        line.substring(1, line.length - 1)
      );
      const keys = Object.keys(others);
      if (keys.length) {
        throw new Error(`Unsupported demo props: ${keys.join(", ")}`);
      }

      promises.push(
        insertImportedCode({
          lines,
          index: i,
          directory,
          importName: component,
          card: !!card,
          phone: !!phone,
          watch,
        })
      );
    }
  }

  await Promise.all(promises);
  const content = lines.join("\n");
  await writeFile(outPath, content, "utf8");
}
