import fs from "fs-extra";
import path from "path";
import {
  CompilerHost,
  CompilerOptions,
  createProgram,
  createSourceFile,
  ResolvedModule,
  resolveModuleName,
  ScriptTarget,
  sys,
} from "typescript";
import { documentationRoot } from "./paths";
import { format, list, log } from "./utils";

const {
  getCurrentDirectory,
  getDirectories,
  fileExists,
  readFile,
  useCaseSensitiveFileNames,
} = sys;

function getSourceFile(fileName: string, language: ScriptTarget) {
  const source = sys.readFile(fileName);
  return typeof source !== "undefined"
    ? createSourceFile(fileName, source, language)
    : undefined;
}

/**
 * This is where the "magic" happens. The compiler host is used to track all the imports
 * for each file with the `resolveModulesName` function.
 */
function createCompilerHost(
  imports: Set<string>,
  aliases: string[],
  compilerOptions: CompilerOptions
): CompilerHost {
  return {
    getSourceFile,
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory,
    getDirectories,
    getCanonicalFileName: fileName =>
      useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
    useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
    getNewLine: () => sys.newLine,
    fileExists,
    readFile,
    resolveModuleNames: (moduleNames, file) =>
      resolveModuleNames(moduleNames, file, imports, aliases, compilerOptions),
  };
}

export const NOOP_PACKAGE = "NOOP_PACKAGE";

/**
 * A small util that will make a "pretty" module name from the provided
 * file path.
 */
function getModuleName(filePath: string, scss: boolean = false) {
  if (/csstype\/index|prop-types/.test(filePath)) {
    return NOOP_PACKAGE;
  } else if (scss && filePath.includes("@react-md")) {
    return filePath.replace(/^.*(@react-md\/[a-z-]+)\/.+$/, "$1");
  }

  return filePath
    .replace(/.*node_modules\//, "")
    .replace(/\/(types|dist\/).+$/, "")
    .replace(/.+documentation\//, "")
    .replace(/prismjs.+/, "prismjs")
    .replace(/.*@types\/([a-z-]+)\/.+/, "$1");
}

function isDirectory(filePath: string) {
  try {
    return fs.lstatSync(filePath).isDirectory();
  } catch (e) {
    return false;
  }
}

/**
 * Checks if the module is resolved as a non typescript file. This has a side-effect
 * of also updating the `resolvedModules` with the "resolved" fake name and adding
 * the resolved import to the imports set.
 */
function isNonTSResolved(
  name: string,
  resolvedModules: ResolvedModule[],
  imports: Set<string>
): boolean {
  if (!isMarkdown(name) && !isStyle(name) && !isSvg(name)) {
    return false;
  }

  resolvedModules.push({ resolvedFileName: `${name}.ts` });

  if (!isMarkdown(name)) {
    imports.add(getModuleName(name));
  }

  return true;
}

function isAliasedResolved(
  name: string,
  resolvedModules: ResolvedModule[],
  imports: Set<string>,
  aliases: string[]
): boolean {
  if (!isAliased(name, aliases)) {
    return false;
  }

  let resolvedFileName = name;
  if (isDirectory(name)) {
    resolvedFileName = path.join(resolvedFileName, "index");
  }

  if (!path.extname(resolvedFileName)) {
    const extensions = ["ts", "tsx"];
    const ext = extensions.find(e => fs.existsSync(`${resolvedFileName}.${e}`));

    if (!ext) {
      console.error("Unknown extension for file");
      process.exit(1);
    }

    resolvedFileName = `${resolvedFileName}.${ext}`;
  }

  if (/Code\.tsx/.test(resolvedFileName)) {
    imports.add("components/Code/code.scss");
    imports.add("_variables.scss");
  }

  imports.add(resolvedFileName);
  resolvedModules.push({ resolvedFileName });
  return true;
}

/**
 * This function will add all the imports found in the file into the main imports
 * set so that the list of modules can be used to determine what things to
 * include as well as what files are included in a demo.
 */
export function resolveModuleNames(
  moduleNames: string[],
  fileContents: string,
  imports: Set<string>,
  aliases: string[],
  compilerOptions: CompilerOptions
): ResolvedModule[] {
  const resolvedModules: ResolvedModule[] = [];
  for (const name of moduleNames) {
    if (
      isNonTSResolved(name, resolvedModules, imports) ||
      isAliasedResolved(name, resolvedModules, imports, aliases)
    ) {
      continue;
    }

    const result = resolveModuleName(name, fileContents, compilerOptions, {
      fileExists,
      readFile,
    });

    const { resolvedModule } = result;
    if (resolvedModule) {
      const moduleName = getModuleName(resolvedModule.resolvedFileName);
      resolvedModules.push(resolvedModule);
      imports.add(moduleName);
      continue;
    }

    console.error(`Unable to find a module for "${name}"`);
    console.error();
    process.exit(1);
  }

  return resolvedModules;
}

export function parseTypescript(
  filePath: string,
  imports: Set<string>,
  aliases: string[],
  compilerOptions: CompilerOptions
) {
  const host = createCompilerHost(imports, aliases, compilerOptions);
  createProgram([filePath], compilerOptions, host);

  return imports;
}

const SCSS_IMPORT = /@import '(.+)';/g;

export function parseScss(filePath: string, imports: Set<string>) {
  const contents = fs.readFileSync(filePath, "utf8");
  const matches = contents.match(SCSS_IMPORT) || [];
  matches.forEach(match => {
    imports.add(getModuleName(match, true));
  });
}

export function parseFile(
  filePath: string,
  aliases: string[],
  compilerOptions: CompilerOptions
): string[] {
  const imports: Set<string> = new Set();
  if (isStyle(filePath)) {
    parseScss(filePath, imports);
  } else {
    parseTypescript(filePath, imports, aliases, compilerOptions);
  }

  return Array.from(imports);
}

export function isMarkdown(filePath: string) {
  return filePath.endsWith(".md");
}

export function isStyle(filePath: string) {
  return /\.s?css$/.test(filePath);
}

export function isSvg(filePath: string) {
  return /\.svg$/.test(filePath);
}

export function isRelative(filePath: string) {
  return /^\.\.?\//.test(filePath);
}

export function isAliased(filePath: string, aliases: string[]) {
  return aliases.some(alias => filePath.startsWith(alias));
}

export function getAliasedModules(modules: string[], aliases: string[]) {
  return modules.filter(moduleName => isAliased(moduleName, aliases));
}

export function getRelativeModules(modules: string[]) {
  return modules.filter(moduleName => /^\.\.?\//.test(moduleName));
}

export function setAll(toSet: Set<string>, values: string[] | Set<string>) {
  values.forEach(value => {
    toSet.add(value);
  });
}

export function getRelativeRoot(filePath: string) {
  return filePath.substring(0, filePath.lastIndexOf(path.sep));
}

export function createSandboxedDemo(
  demoPath: string,
  aliases: string[],
  compilerOptions: CompilerOptions
) {
  log(`Finding and resolving the demo dependencies for:`);
  log(list([demoPath]));
  log();

  const importedModules = parseFile(demoPath, aliases, compilerOptions);
  const traversed = new Set(importedModules);
  traversed.add("react");
  traversed.add("react-dom");
  traversed.add("@react-md/theme");
  traversed.add("@react-md/typography");
  traversed.add("@react-md/utils");

  const relativeModules: string[] = [];
  getRelativeModules(importedModules).forEach(moduleName => {
    const resolvedName = path.join(getRelativeRoot(demoPath), moduleName);
    relativeModules.push(resolvedName);
    traversed.delete(moduleName);
    traversed.add(resolvedName);
  });
  const remainingModules = new Set([
    ...relativeModules,
    ...getAliasedModules(importedModules, aliases),
  ]);

  while (remainingModules.size) {
    const moduleName = remainingModules.values().next().value;
    remainingModules.delete(moduleName);

    const nextResolved: string[] = [];
    const nextRemaining: string[] = [];
    const parsedModules = parseFile(moduleName, aliases, compilerOptions);
    parsedModules.forEach(name => {
      if (isRelative(name)) {
        nextRemaining.push(path.join(getRelativeRoot(moduleName), name));
      } else if (isAliased(name, aliases)) {
        nextRemaining.push(name);
      } else {
        nextResolved.push(name);
      }
    });

    setAll(traversed, nextResolved);
    setAll(traversed, nextRemaining);
    setAll(remainingModules, nextRemaining);
  }

  const importsAndDependencies = Array.from(traversed)
    .filter(n => n !== NOOP_PACKAGE)
    .sort();
  log("Found the following imports and dependencies...");
  log(list(importsAndDependencies));
  log();

  const imports = getAliasedModules(importsAndDependencies, aliases);
  const dependencies = importsAndDependencies.filter(
    name => !imports.includes(name)
  );
  if (imports.length + dependencies.length !== importsAndDependencies.length) {
    console.error(
      "Uh oh. Things didn't resolve correctly since the imports and dependencies" +
        "don't match up!"
    );
    console.error("Imports:");
    console.error(list(imports));
    console.error();
    console.error("Dependencies:");
    console.error(list(dependencies));
    console.error();
    process.exit(1);
  }

  return createSandbox(demoPath, dependencies, imports, aliases);
}

const indexFile = `import React from "react";
import { render } from "react-dom";

import "./styles.scss";

import Demo from "./Demo";

render(<Demo />, document.getElementById("root"));
`;

function createDefaultStyles(dependencies: string[]) {
  const rmdDependencies = dependencies.filter(name =>
    name.startsWith("@react-md")
  );

  const i = rmdDependencies.findIndex(name => name.endsWith("utils"));
  const utils = rmdDependencies.splice(i, 1);

  const imports = [...rmdDependencies, utils]
    .map(name => `@import '${name}/dist/mixins';`)
    .join("\n");

  return `${imports}

@include react-md-utils;
`;
}

function createSandbox(
  demoPath: string,
  dependencies: string[],
  imports: string[],
  aliases: string[]
) {
  const filePath = demoPath.replace(".tsx", "Sandbox.json");
  const demoFile = fs.readFileSync(demoPath, "utf8");
  const packageJson = {
    dependencies: dependencies.reduce(
      (content, dependency) => ({
        ...content,
        [dependency]: "latest",
      }),
      {}
    ),
  };

  const baseFiles = {
    "package.json": packageJson,
    "src/index.tsx": { content: indexFile, isBinary: false },
    "src/Demo.tsx": { content: demoFile, isBinary: false },
    "src/styles.scss": {
      content: createDefaultStyles(dependencies),
      isBinary: false,
    },
  };

  const files = imports.reduce((content, filePath) => {
    const fileName = `src/${filePath}`;
    if (content[fileName]) {
      console.error(
        "Sandbox rules need to be updated. Found multiple files with the same name."
      );
      console.error("Current file path: ", filePath);
      console.error();
      console.error("Imports:");
      console.error(list(imports));
      process.exit(1);
    }

    return {
      ...content,
      [fileName]: {
        content: fs.readFileSync(filePath, "utf8"),
        isBinary: /\.png$/.test(fileName),
      },
    };
  }, baseFiles);

  log("Demo files:");
  log(list(Object.keys(files)));
  log();

  log("Creating the sandbox.json file at");
  log(list([filePath]));
  log();

  fs.writeJsonSync(filePath, files, { spaces: 2 });
  log("Done!");
  log();
}

export async function createSandboxesFile(sandboxes: string[]) {
  const lookups = {};
  sandboxes.forEach(jsonPath => {
    const [, , packageName, sandboxJson] = jsonPath.split("/");
    const demoName = sandboxJson.replace("Sandbox.json", "");

    const value = `() => resolve(import('./${packageName}/${sandboxJson}'))`;
    lookups[`${packageName}/${demoName}`] = value;
  });

  const sandboxesRecord = JSON.stringify(lookups, null, 2).replace(
    /"(\(.+)"/g,
    "$1"
  );

  const code = `/** this is a generated file from \`dev-utils sandbox\` */
import { IFiles } from "codesandbox-import-utils/lib/api/define";

import { upperFirst } from "utils/toTitle";

interface SandboxesRecord {
  [key: string]: () => Promise<IFiles>;
}

const resolve = (importer: Promise<any>) => importer.then(content => content.default as IFiles);

const sandboxes: SandboxesRecord = ${sandboxesRecord};

const dummy = () => Promise.resolve<IFiles>({
  "package.json": {
    isBinary: false,
    content: JSON.stringify({
      dependencies: {
        react: "latest",
        "react-dom": "latest",
      },
    }),
  },
  "src/index.tsx": { content: "", isBinary: false },
  "src/Demo.tsx": { content: "", isBinary: false },
});

export default function getSandboxer(packageName: string, demoName: string) {
  packageName = packageName.replace(/ /g, "");
  demoName = demoName.split(" ").map(upperFirst).join("");
  const sandboxer = sandboxes[\`\${packageName}/\${demoName}\`];
  if (!sandboxer) {
    console.error("Unable to find a sandbox import for the following package and demo name");
    console.error("packageName: ", packageName);
    console.error("demoName: ", demoName);
    return dummy;
  }

  return sandboxer;
}
`;

  return format(
    code,
    path.join(documentationRoot, "pages", "index.ts"),
    "typescript"
  );
}
