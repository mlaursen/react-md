import * as fs from "fs-extra";
import * as path from "path";
import * as _ from "lodash";

import createIndexTemplate from "./createIndexTemplate";
import createRouteTemplate from "./createRouteTemplate";
import createExamplesTemplate from "./createExamplesTemplate";
import createPropTypesTemplate from "./createPropTypesTemplate";
import createSassDocTemplate from "./createSassDocTemplate";

const documentationFolder = process.cwd();
const componentsFolder = path.join(documentationFolder, "src", "components");

function toPascalCase(s: string) {
  return _.upperFirst(s)
    .split("-")
    .map(part => _.upperFirst(part))
    .join("");
}

export default async function createFolderStructure(
  name: string,
  propTypes: boolean,
  sassdoc: boolean,
  examples: boolean
) {
  const pascalCasedName = toPascalCase(name);
  const rootFolder = path.join(componentsFolder, "packages", pascalCasedName);
  const examplesFolder = path.join(rootFolder, "Examples");
  const mainIndex = path.join(rootFolder, "index.ts");
  const mainRoute = path.join(rootFolder, `${pascalCasedName}.tsx`);
  const installation = path.join(rootFolder, "Installation.tsx");
  const examplesIndex = path.join(examplesFolder, "index.ts");
  const examplesFile = path.join(examplesFolder, "Examples.tsx");
  const propTypesFile = path.join(rootFolder, `${pascalCasedName}PropTypes.tsx`);
  const sassdocFile = path.join(rootFolder, `${pascalCasedName}SassDoc.tsx`);

  await fs.remove(rootFolder);
  await fs.ensureDir(rootFolder);
  await fs.ensureDir(examplesFolder);

  const files = [
    mainIndex,
    mainRoute,
    examples && examplesIndex,
    examples && examplesFile,
    propTypes && propTypesFile,
    sassdoc && sassdocFile,
  ].filter(Boolean);

  console.log(`Creating the following files:
${files.map(f => `- ${f.substring(documentationFolder.length + 1)}`).join("\n")}
`);

  return Promise.all([
    fs.outputFile(mainIndex, createIndexTemplate(pascalCasedName)),
    fs.outputFile(mainRoute, createRouteTemplate(pascalCasedName, propTypes, sassdoc)),
    examples ? fs.outputFile(examplesIndex, createIndexTemplate("Examples")) : Promise.resolve(),
    examples ? fs.outputFile(examplesFile, createExamplesTemplate(pascalCasedName)) : Promise.resolve(),
    propTypes ? fs.outputFile(propTypesFile, createPropTypesTemplate(pascalCasedName)) : Promise.resolve(),
    sassdoc ? fs.outputFile(sassdocFile, createSassDocTemplate(pascalCasedName)) : Promise.resolve(),
  ]);
}
