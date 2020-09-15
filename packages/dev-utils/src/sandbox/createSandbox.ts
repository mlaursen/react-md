import { writeJsonSync } from "fs-extra";
import log from "loglevel";
import { join, sep } from "path";
import { ImportDeclaration, Project } from "ts-morph";

import { JSONObject } from "../constants";
import { format, toTitle } from "../utils";
import { getAliases } from "./aliases";
import {
  DEMO_INDEX,
  DEMO_INDEX_HTML,
  SANDBOXES_PATH,
  VARIABLES_SCSS_FILE,
} from "./constants";
import { createDemoStyles } from "./createDemoStyles";
import { createPackageJson } from "./createPackageJson";
import { getAllDependencies } from "./getAllDependencies";
import { getDemoSourceFile } from "./getSourceFile";

function getExtension(filePath: string): string {
  if (/\.(tsx?|scss|svg)$/.test(filePath)) {
    return "";
  }

  if (/^(\.{1,2}\/)*[A-Z]/.test(filePath)) {
    return ".tsx";
  }

  return ".ts";
}

function transformFileContents(
  contents: string,
  filePath: string,
  demoName?: string
): string {
  const parentFolders = filePath.replace("src/", "").split("/").length - 1;

  const aliasRegExp = new RegExp(
    `"(${getAliases().join("|")}).*/(?=[A-z]+(.[a-z]+)?")`,
    "g"
  );
  let aliasReplacement = "./";
  if (parentFolders > 0) {
    aliasReplacement = Array.from({ length: parentFolders }, () => "../").join(
      ""
    );
  }

  let transformed = contents
    .replace(/^import Code(Block)?.+;$/gm, "")
    .replace(/<CodeBlock[^>]*>/g, "<pre><code>")
    .replace(/<\/CodeBlock>/g, "</code></pre>")
    .replace(/<(\/)?Code/g, "<$1code")
    .replace(aliasRegExp, `"${aliasReplacement}`);

  if (demoName) {
    transformed = transformed
      .replace(`${demoName}: FC`, "Demo: FC")
      .replace(`default ${demoName};`, "default Demo;")
      .replace(new RegExp(`<${demoName}(\\s+)`, "g"), "<Demo$1");
  }

  return format(transformed);
}

export function createSandbox(
  demo: ImportDeclaration,
  project: Project,
  parentFolder: string
): void {
  const importName = demo.getModuleSpecifierValue();
  const sourceFile = getDemoSourceFile(importName, parentFolder, project);
  const [dependencies, resolvedFiles] = getAllDependencies(sourceFile, project);
  const [packageName, demoOrFolder, demoOrNothing] = sourceFile
    .getFilePath()
    .replace(new RegExp(`.+${sep}Demos${sep}`), "")
    .split(sep);
  const demoName = (demoOrNothing || demoOrFolder).replace(/\..+$/, "");
  const demoTitle = toTitle(demoName, " ", true);
  const fullDemoTitle = `${packageName} Example - ${demoTitle}`;

  const files: Record<string, JSONObject> = {
    "public/index.html": {
      content: DEMO_INDEX_HTML.replace("{{DEMO_TITLE}}", fullDemoTitle),
    },
    "src/index.tsx": {
      content: DEMO_INDEX,
    },
    "src/styles.scss": {
      content: createDemoStyles(dependencies),
    },
    "src/_variables.scss": {
      content: VARIABLES_SCSS_FILE,
    },
    "package.json": createPackageJson(
      demoTitle,
      fullDemoTitle,
      packageName,
      dependencies
    ),
    "src/Demo.tsx": {
      content: transformFileContents(
        sourceFile.getFullText(),
        "src/Demo.tsx",
        demoName
      ),
    },
  };

  const aliasRegExp = new RegExp(`^(${getAliases().join("|")})/`);
  resolvedFiles.forEach((contents, aliasedFileName) => {
    const fileName = aliasedFileName
      .replace(aliasRegExp, "")
      .replace(/\/?Demos\/[A-z]+\/?/, "");
    const key = join("src", `${fileName}${getExtension(fileName)}`);
    if (files[key]) {
      log.error(`${key} already exists in the resolved files`);
      log.error(new Error().stack);
      process.exit(1);
    }

    let formatted = contents;
    if (!key.endsWith(".svg")) {
      formatted = transformFileContents(contents, key);
    }

    files[key] = { content: formatted };
  });

  log.debug(`Creating sandbox for ${demoName}`);
  const sandboxPath = join(SANDBOXES_PATH, `${packageName}-${demoName}.json`);
  writeJsonSync(sandboxPath, files, { spaces: 2 });
}
