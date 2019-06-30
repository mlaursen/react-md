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
import log from "loglevel";

import { documentationRoot } from "../paths";
import { list } from "../utils";
import {
  getModuleName,
  getRelativeFolder,
  getAliasedRelativeFolder,
  getFileSource,
} from "./formatters";
import {
  isAliased,
  isDirectory,
  isMarkdown,
  isStyle,
  isSvg,
  isRaw,
  isRelative,
} from "./matchers";

const SCSS_IMPORT = /@import '(.+)';/g;

/**
 * This is fairly simple and just matches for all the @import statements
 * in the file.
 */
function getScssImports(filePath: string) {
  const contents = fs.readFileSync(filePath, "utf8");
  const matches = contents.match(SCSS_IMPORT) || [];
  return matches.map(match => getModuleName(match, true));
}

/**
 * This took me forever to understand, so I'll describe what's going on here.
 * Since everything is written in typescript, we can use the typescript compiler
 * to find all the resolutions based on the provided file path.
 *
 * At the time of writing this, typescript's compiler does not have a built-in
 * way to inspect a file for the fully resolved file name so you have to create
 * your own compiler "host" (no idea what that's about) to manually track the
 * resolutions. The custom "host" I have created is _almost_ the same as the
 * built in default host, but it also manually tracks unique imports in an
 * imports set as well as resolves unknown file types.
 *
 * Once the createProgram function is called, typescript will do its thing and start
 * creating an AST and all this other stuff and update the imports set from the
 * custom compiler host with all the dependencies/imports from the provided file path.
 * When it finishes, the imports should be populated with all the imported files
 * as well as some of the custom resolution file names.
 */
function parseTypescript(
  filePath: string,
  aliases: string[],
  compilerOptions: CompilerOptions
) {
  const imports = new Set<string>();
  const host = createCompilerHost(imports, aliases, compilerOptions);
  createProgram([filePath], compilerOptions, host);

  return imports;
}

const {
  getCurrentDirectory,
  getDirectories,
  fileExists,
  useCaseSensitiveFileNames,
} = sys;

const readFile: typeof sys.readFile = (path, encoding) => {
  const source = sys.readFile(path, encoding);
  if (typeof source === "undefined") {
    return source;
  }

  return getFileSource(source);
};

function getSourceFile(fileName: string, language: ScriptTarget) {
  const source = readFile(fileName);
  return typeof source !== "undefined"
    ? createSourceFile(fileName, source, language)
    : undefined;
}

/**
 * This creates the custom compiler host that is almost the same as the native implementation,
 * but with the custom resolveModuleNames function.
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

/**
 * This function will add all the imports found in the file into the main imports
 * set so that the list of modules can be used to determine what things to
 * include as well as what files are included in a demo.
 */
export function resolveModuleNames(
  moduleNames: string[],
  filePath: string,
  imports: Set<string>,
  aliases: string[],
  compilerOptions: CompilerOptions
): ResolvedModule[] {
  const resolvedModules: ResolvedModule[] = [];
  moduleNames.forEach(name => {
    // first attempt normal typescript resolution
    const { resolvedModule } = resolveModuleName(
      name,
      filePath,
      compilerOptions,
      {
        fileExists,
        readFile,
      }
    );

    if (resolvedModule) {
      resolvedModules.push(resolvedModule);

      if (filePath.includes("node_modules")) {
        // don't want to include child dependenencies
        return;
      }

      let importName = resolvedModule.resolvedFileName;
      if (resolvedModule.packageId && resolvedModule.packageId.name) {
        importName = resolvedModule.packageId.name;
      }

      importName = getModuleName(importName);
      imports.add(importName);
      if (/Code\.tsx/.test(importName)) {
        imports.add(importName.replace("Code.tsx", "code.scss"));
        imports.add(importName.replace("Code.tsx", "index.ts"));
      }
      return;
    } else if (isRaw(name)) {
      resolvedModules.push({ resolvedFileName: `${name}.ts` });
      return;
    } else if (isStyle(name) || isSvg(name) || isMarkdown(name)) {
      resolvedModules.push({ resolvedFileName: `${name}.ts` });
      let updatedName = getModuleName(name);
      if (isRelative(updatedName)) {
        updatedName = path.join(
          getAliasedRelativeFolder(filePath, aliases),
          updatedName
        );
      }

      imports.add(updatedName);
      return;
    }

    console.error(`Unable to find a module for "${name}" in "${filePath}"`);
    console.error();
    process.exit(1);
  });

  return resolvedModules;
}

/**
 * Checks a "components/Demos/NAME/index.tsx" file for all the imported demos.
 */
export async function extractDemoFiles(
  demoIndexPath: string,
  aliases: string[]
) {
  // package name is always the folder right before the index.tsx
  const name = demoIndexPath.split(path.sep).reverse()[1];
  log.debug(`Finding all the demos for ${name} package...`);

  const contents = await fs.readFile(demoIndexPath, "utf8");
  // want to exclude files that have a comment after them (normally do // SANDBOX_IGNORE),
  // but just makes sure the line ends with ;
  const demos = (contents.match(/from "(.\/[A-z]+)"(?=;\r?\n)/g) || []).map(
    demoName => {
      demoName = demoName.replace(/from /, "").replace(/"/g, "");
      let fullPath = path.join(getRelativeFolder(demoIndexPath), demoName);
      if (fs.existsSync(fullPath)) {
        fullPath = `${fullPath}/${demoName}.tsx`;
      } else {
        fullPath = `${fullPath}.tsx`;
      }

      return fullPath;
    }
  );

  if (!demos.length) {
    console.warn(`${name} packages does not have any demos! Is this correct?`);
    console.warn();
  }

  return demos;
}

/**
 * Parses a typescript or scss file and builds an array of all the unique
 * imports within the file.
 */
export function extractImports(
  filePath: string,
  aliases: string[],
  compilerOptions: CompilerOptions
): string[] {
  const imports = parseTypescript(filePath, aliases, compilerOptions);
  imports.forEach(fileName => {
    if (isStyle(fileName)) {
      const scssImports = getScssImports(fileName).filter(
        n => !n.includes("@import")
      );
      scssImports.forEach(name => {
        imports.add(name);
      });
    }
  });

  return Array.from(imports);
}
