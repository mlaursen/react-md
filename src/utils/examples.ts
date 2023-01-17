import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { join, resolve } from "node:path";
import { Project } from "ts-morph";
import { pascalCase } from "./string";

export async function extractExamples(name: string) {
  const examplesName = `${pascalCase(name)}Examples`;
  const examples = await import(`src/components/${examplesName}/examples.ts`);
  console.log("examples:", examples);
  const examplesFilePath = join(
    process.cwd(),
    "src",
    "components",
    examplesName,
    "examples.ts"
  );
  await access(examplesFilePath, constants.F_OK);

  const project = new Project({
    tsConfigFilePath: resolve(process.cwd(), "tsconfig.json"),
  });

  const examplesSourceFile = project.getSourceFileOrThrow(examplesFilePath);
  const exampleComponentExports = examplesSourceFile.getExportDeclarations();
  exampleComponentExports.forEach((exampleComponentExport) => {
    const demoName = exampleComponentExport.getNamedExports()[0].getText();
    console.log("demoName:", demoName);
    // exampleComponentExport.
    // const exampleComponent =
    //   exampleComponentExport.getModuleSpecifierSourceFileOrThrow();

    // const name = exampleComponent.getText();
    // console.log("name:", name);
  });

  return {
    name,
    // examples: Object.values(examples),
  };
}
