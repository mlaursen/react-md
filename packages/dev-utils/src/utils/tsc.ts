// https://github.com/Microsoft/TypeScript/issues/6387#issuecomment-169739615
import { readFileSync } from "fs";
import log from "loglevel";
import { join } from "path";
import {
  createEmitAndSemanticDiagnosticsBuilderProgram,
  createIncrementalProgram,
  createProgram,
  createWatchCompilerHost,
  createWatchProgram,
  Diagnostic,
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics,
  parseConfigFileTextToJson,
  ParsedCommandLine,
  parseJsonConfigFileContent,
  Program,
  sys,
} from "typescript";

import { projectRoot, src, types } from "../constants";
import getCurrentPackageName from "./getCurrentPackageName";

export type CompileTarget = "ejs" | "cjs" | "var";

const threeLines = sys.newLine + sys.newLine + sys.newLine;

function reportDiagnostic(diagnostic: Diagnostic): void {
  let message = "Error";
  if (diagnostic.file) {
    const { fileName, getLineAndCharacterOfPosition } = diagnostic.file;
    message = `${message} ${fileName}`;
    try {
      // it looks like this will fail for incremental builds?
      const { line, character } = getLineAndCharacterOfPosition(
        diagnostic.start
      );
      message = `${message} (${line + 1}, ${character + 1})`;
    } catch (e) {}
  }

  const flattened = flattenDiagnosticMessageText(
    diagnostic.messageText,
    sys.newLine
  );
  message = `${message}: ${flattened}${threeLines}`;

  sys.write(message);
}

// I need to figure out where the codes are stored, but want to make the terminal
// not clear the screen when its a compilation error
// https://github.com/microsoft/TypeScript/blob/8feff60aeeedae91a4fe797ecbce1dd7d140ddda/src/compiler/watch.ts#L33
const STARTING_WATCH_CODE = 6031;
const WATCH_CHANGE_DETECTED_CODE = 6032;
const MESSAGE_CODES: number[] = [
  STARTING_WATCH_CODE,
  WATCH_CHANGE_DETECTED_CODE,
];

function reportWatchStatusChanged(
  packageName: string
): (diagnostic: Diagnostic) => void {
  return function handleDiagnostic(diagnostic) {
    const clearable = MESSAGE_CODES.includes(diagnostic.code);
    let output = "";
    if (sys.clearScreen && clearable) {
      sys.clearScreen();
    } else {
      output += sys.newLine;
    }

    output += `[${packageName} - ${new Date().toLocaleTimeString()}] `;
    output += flattenDiagnosticMessageText(diagnostic.messageText, sys.newLine);
    output += sys.newLine + clearable ? sys.newLine : "";

    sys.write(output);
  };
}

/**
 * This is a bit different than the original since I normally run a few tsc
 * commands for a single project since I need to build ejs, cjs, and scss
 * variables. If the build was successful the process will not exit so the
 * others can be built but. If there was an error, the process will exit.
 */
function reportDiagnostics(
  diagnostics: Diagnostic[],
  failure: boolean = true
): never | void {
  diagnostics.forEach(reportDiagnostic);

  if (failure) {
    return process.exit(1);
  }
}

function getParsedTsConfig(target: CompileTarget): ParsedCommandLine {
  const tsconfig = join(projectRoot, "tsconfig.base.json");
  const baseConfig = readFileSync(tsconfig).toString();
  const { config, error } = parseConfigFileTextToJson(tsconfig, baseConfig);
  if (!config) {
    reportDiagnostics([error]);
  }

  const isCJS = target === "cjs";
  const isEJS = target === "ejs";
  const isVar = target === "var";
  let outDir: string;
  if (isEJS) {
    outDir = "es";
  } else if (isCJS) {
    outDir = "lib";
  } else {
    outDir = "dist";
  }

  const currentConfig = {
    ...config,
    compilerOptions: {
      ...config.compilerOptions,
      outDir,
      rootDir: src,
    },
    include: [isVar ? `${src}/scssVariables.ts` : src],
    exclude: ["**/__tests__/", !isVar && "**/scssVariables.ts"].filter(Boolean),
  };

  // can't set them to `undefined` like I did before since the parser will throw warnings
  // for `undefined`. I guess it checks for keys specifically instead of valued keys?
  if (!isVar) {
    currentConfig.compilerOptions.incremental = true;
    currentConfig.compilerOptions.tsBuildInfoFile = `${outDir}/.tsbuildinfo`;
  }

  if (!isCJS) {
    currentConfig.compilerOptions.declaration = true;
  }

  if (isEJS) {
    currentConfig.compilerOptions.declarationDir = types;
  }

  if (!isEJS) {
    currentConfig.compilerOptions.module = "commonjs";
  }

  const parsedConfig = parseJsonConfigFileContent(currentConfig, sys, ".");
  if (parsedConfig.errors.length) {
    reportDiagnostics(parsedConfig.errors);
  }

  return parsedConfig;
}

function createWatcher(cjs: boolean, packageName: string): void {
  const { fileNames, options } = getParsedTsConfig(cjs ? "cjs" : "ejs");
  const host = createWatchCompilerHost(
    fileNames,
    options,
    sys,
    createEmitAndSemanticDiagnosticsBuilderProgram,
    reportDiagnostic,
    reportWatchStatusChanged(packageName)
  );

  createWatchProgram(host);
}

/**
 * Creates a watcher program with the typescript compiler API. This should normally
 * be used with the `-w` or `--watch` option is provided.
 */
export function tscWatcher(cjs: boolean): void {
  const name = getCurrentPackageName(false);
  createWatcher(false, name);
  if (cjs) {
    createWatcher(true, name);
  }
}

/**
 * This runs tsc as if it was being called from the command line, but only
 * based on a compile target. It will dynamically generate the tsconfig based
 * on the compile target and the `tsconfig.base.json` so that each child
 * package don't need to maintain the tsconfig.json files
 */
export default function tsc(target: CompileTarget): void {
  log.info(`tsc -p tsconfig.${target}.json`);

  const { fileNames, options } = getParsedTsConfig(target);
  let program: Program;
  if (options.incremental) {
    const incrementalProgram = createIncrementalProgram({
      rootNames: fileNames,
      options,
    });
    program = incrementalProgram.getProgram();
  } else {
    program = createProgram(fileNames, options);
  }
  const { diagnostics, emitSkipped } = program.emit();

  reportDiagnostics(
    getPreEmitDiagnostics(program).concat(diagnostics),
    emitSkipped
  );
}
