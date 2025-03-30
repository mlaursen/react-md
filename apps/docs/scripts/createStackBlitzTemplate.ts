import { getProjectRootDir } from "docs-generator/utils/getProjectRootDir";
import { log } from "docs-generator/utils/log";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { format } from "prettier";

import packageJson from "../package.json" with { type: "json" };
import {
  GENERATED_FILE_BANNER,
  GENERATED_STACKBLITZ_FILE,
} from "./constants.js";
import { ensureGeneratedDir } from "./ensureGeneratedDir.js";

function getAllFiles(dir: string): readonly string[] {
  const files: string[] = [];
  const dirFiles = readdirSync(dir);
  dirFiles.forEach((file) => {
    if (
      /node_modules|(\.git$)|RootLayout|MainNavigation|README|CHANGELOG|(\.(ico|png))/.test(
        file
      )
    ) {
      return;
    }

    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  });

  return files;
}

interface TemplateHiddenInputProps {
  name: string;
  value: string;
}

function toTemplateHiddenInputProps(
  fullFilePath: string
): TemplateHiddenInputProps {
  const srcPath = fullFilePath.replace(/^.+vite-(t|j)s\//, "");
  const name = basename(srcPath);

  let contents = readFileSync(fullFilePath, "utf8");
  if (name === "package.json") {
    const parsed = JSON.parse(contents);
    // sass-embedded doesn't work here for some reason
    parsed.devDependencies.sass = parsed.devDependencies["sass-embedded"];
    delete parsed.devDependencies["sass-embedded"];

    contents = JSON.stringify(parsed, null, 2);
  } else if (name === "index.html") {
    contents = contents.replace(
      /id="root"/,
      `id="root" class="{{CLASS_NAME}}"`
    );
  }

  return {
    name: `project[files][${srcPath}]`,
    value: contents,
  };
}

async function run(): Promise<void> {
  await ensureGeneratedDir();

  const examplesRoot = join(getProjectRootDir(), "examples");
  const typescriptFiles = getAllFiles(join(examplesRoot, "vite-ts"));
  const javascriptFiles = getAllFiles(join(examplesRoot, "vite-js"));

  const contents = `${GENERATED_FILE_BANNER}

export const JS_STACKBLITZ_TEMPLATE = ${JSON.stringify(javascriptFiles.map((file) => toTemplateHiddenInputProps(file)))}
export const TS_STACKBLITZ_TEMPLATE = ${JSON.stringify(typescriptFiles.map((file) => toTemplateHiddenInputProps(file)))}

export const STACKBLITZ_DEPENDENCIES: Record<string, string> = ${JSON.stringify(
    {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }
  )}
`;

  await writeFile(
    GENERATED_STACKBLITZ_FILE,
    await format(contents, { filepath: GENERATED_STACKBLITZ_FILE }),
    "utf8"
  );
}

await log(run(), "", `Created ${GENERATED_STACKBLITZ_FILE}`);
