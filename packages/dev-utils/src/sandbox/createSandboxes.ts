import log from "loglevel";
import { join, sep } from "path";
import { Project } from "ts-morph";
import { documentationRoot } from "../constants";
import { createSandbox } from "./createSandbox";

const IGNORE_TOKEN = "/* SANDBOX_IGNORE */";

export function createSandboxes(
  demoFiles: readonly string[],
  demoPattern: string
): void {
  const project = new Project({
    tsConfigFilePath: join(documentationRoot, "tsconfig.json"),
  });
  const demoRegExp = new RegExp(demoPattern.replace(/\*/g, ".*"));
  log.debug("Demo regexp: ", demoRegExp);

  demoFiles.forEach((demoFilePath) => {
    const parentFolder = demoFilePath.substring(
      0,
      demoFilePath.lastIndexOf(sep)
    );

    const sourceFile = project.getSourceFileOrThrow(demoFilePath);
    const imports = sourceFile.getImportDeclarations();
    const i =
      imports.findIndex((imp) => imp.getText().endsWith('../DemoPage";')) + 1;
    if (i === 0) {
      log.error(
        "Unable to find a `DemoPage` token for the current source file:"
      );
      log.error(sourceFile.getFilePath());
      log.error(new Error().stack);
      process.exit(1);
    }
    const demos = imports
      .slice(i)
      .filter(
        (imp) =>
          !imp.getModuleSpecifierValue().endsWith(".md") &&
          !imp.getFullText().includes(IGNORE_TOKEN)
      );

    demos.forEach((demo) => {
      const demoName = demo.getModuleSpecifierValue();
      if (!demoRegExp.test(demoName)) {
        log.debug(`Skipping "${demoName}"`);
        return;
      }

      createSandbox(demo, project, parentFolder);
    });
  });
}
