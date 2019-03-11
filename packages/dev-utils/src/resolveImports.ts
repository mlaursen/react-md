import fs from "fs-extra";
import path from "path";
import ts, {
  createProgram,
  CompilerOptions,
  CompilerHost,
  sys,
  ScriptTarget,
  createSourceFile,
  ResolvedModule,
  resolveModuleName,
} from "typescript";
import { documentationRoot } from "./paths";

function getSourceFile(fileName: string, language: ScriptTarget) {
  const source = sys.readFile(fileName);
  return typeof source !== "undefined"
    ? createSourceFile(fileName, source, language)
    : undefined;
}

function getModuleName(filePath: string) {
  return filePath
    .replace(/.*node_modules\//, "")
    .replace(/\/types.+$/, "")
    .replace(/.+documentation\//, "")
    .replace(/.*@types\/([a-z-]+)\/.+/, "$1");
}

function resolveModuleNames(
  moduleNames: string[],
  file: string,
  options: CompilerOptions,
  root: string,
  imports: Set<string>
): ResolvedModule[] {
  const resolvedModules: ResolvedModule[] = [];
  for (const name of moduleNames) {
    // console.log("name:", name);
    const result = resolveModuleName(name, file, options, {
      fileExists: sys.fileExists,
      readFile: sys.readFile,
    });

    const { resolvedModule } = result;
    if (resolvedModule) {
      const moduleName = getModuleName(resolvedModule.resolvedFileName);
      resolvedModules.push(resolvedModule);
      imports.add(moduleName);
    } else if (/\.(md|s?css)$/.test(name)) {
      resolvedModules.push({
        resolvedFileName: path.join(documentationRoot, "noop.ts"),
      });
      if (/\.s?css$/.test(name)) {
        imports.add(path.join(root, getModuleName(name)));
      }
    } else {
      console.log("name:", name);
    }
    // console.log();
  }

  return resolvedModules;
}

function createCompilerHost(
  options: CompilerOptions,
  root: string,
  imports: Set<string>
): CompilerHost {
  return {
    getSourceFile,
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: sys.getCurrentDirectory,
    getDirectories: sys.getDirectories,
    getCanonicalFileName: fileName =>
      sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
    useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
    getNewLine: () => sys.newLine,
    fileExists: sys.fileExists,
    readFile: sys.readFile,
    resolveModuleNames: (moduleNames, file) =>
      resolveModuleNames(moduleNames, file, options, root, imports),
  };
}

export default async function resolveImports(files: string[]) {
  const source = path.resolve(
    documentationRoot,
    "components",
    "Demos",
    "AppBar",
    "AutoDense.tsx"
  );
  const noop = await fs.writeFile(
    path.join(documentationRoot, "noop.ts"),
    'export default ""',
    "utf8"
  );

  const config = (await fs.readJson(
    path.join(documentationRoot, "tsconfig.json")
  )) as CompilerOptions;
  const imports = new Set<string>();
  const root = source.substring(
    source.indexOf("components"),
    source.lastIndexOf(path.sep)
  );

  const host = createCompilerHost(config, root, imports);
  const program = createProgram([source], config, host);
  imports.delete("prop-types");
  imports.delete("csstype/index.d.ts");
  Array.from(imports.values()).forEach(imp => {
    if (!imp.startsWith("components")) {
      return;
    }

    console.log("imp:", imp);
  });
  console.log("imports:", imports);
  // console.log(program.getSourceFiles());
  // const refs = program.getResolvedProjectReferences();
  // const other = program.getProjectReferences();
  // console.log("other:", other);
  // console.log("refs:", refs);
  // console.log("modules:", modules);
}
