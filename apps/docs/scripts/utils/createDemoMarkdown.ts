import { type RunnableCodePreviewOptions } from "../../src/components/DangerouslyRunCode/RunnableCodePreviewContainer.js";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

// const IMPORT_REGEX = /^import\(".\/([a-zA-Z0-9]+\.tsx)"\)$/gm;
const IMPORT_REGEX = /^{{.+}}$/;

interface FixOptions extends RunnableCodePreviewOptions {
  index: number;
  lines: string[];
  directory: string;
  importName: string;
}

async function fix(options: FixOptions): Promise<void> {
  const { index, lines, directory, importName, card, phone } = options;
  const tsCode = await readFile(join(directory, importName), "utf8");
  const flags = ["preview", "editable", card && "card", phone && "phone"]
    .filter(Boolean)
    .join(" ");

  const formatted = `\`\`\`tsx
// ${flags}
${tsCode}
\`\`\`
`;
  lines[index] = formatted;
}

export async function createDemoMarkdown(
  path: string,
  outPath: string
): Promise<void> {
  const directory = dirname(path);
  const raw = await readFile(path, "utf8");

  const promises: Promise<void>[] = [];
  const lines = raw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (IMPORT_REGEX.test(line)) {
      const { component, card, phone, ...others } = JSON.parse(
        line.substring(1, line.length - 1)
      );
      const keys = Object.keys(others);
      if (keys.length) {
        throw new Error(`Unsupported demo props: ${keys.join(", ")}`);
      }

      promises.push(
        fix({
          lines,
          index: i,
          directory,
          importName: component,
          card: !!card,
          phone: !!phone,
        })
      );
    }
  }

  await Promise.all(promises);
  const content = lines.join("\n");
  await writeFile(outPath, content, "utf8");
}
