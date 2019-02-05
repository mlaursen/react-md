import fs from "fs-extra";
import path from "path";
import { promisify } from "util";
import nodeGlob from "glob";

import {
  compileScss,
  postcss,
  hackSCSSVariableValue,
  IHackedVariableValue,
} from "./compileScss";
import {
  dist,
  cssDist,
  src,
  stylesScss,
  scssVariables,
  projectRoot,
} from "./paths";
import { copyFiles, getPackageName, list, log, format } from "./utils";
import { getPackageVariables } from "./sassdoc";

const glob = promisify(nodeGlob);

export default async function styles() {
  const scssFiles = await glob("src/**/*.scss");
  if (!scssFiles.length) {
    return;
  }

  await copyFiles(scssFiles, dist);
  await createScssVariables();

  const found = scssFiles.find(name => /styles\.scss$/.test(name));
  if (!found) {
    return;
  }

  await compile(false);
  await compile(true);
}

async function compile(production: boolean) {
  const packageName = await getPackageName();
  const srcFile = path.join(src, stylesScss);
  const fileName = `${packageName}${production ? ".min" : ""}.css`;
  const outFile = path.join(cssDist, fileName);
  const sourceMapFile = `${outFile}.map`;

  await fs.ensureDir(cssDist);
  if (!production) {
    log("Compiling a development css bundle along with a sourcemap to:");
    log(list([outFile, sourceMapFile]));
    log();
  } else {
    log("Compiling a production css bundle to:");
    log(list([outFile]));
    log();
  }

  const unmodifiedCSS = compileScss({
    file: srcFile,
    outFile,
    sourceMap: !production,
    outputStyle: "expanded",
  }).css.toString();

  const { css, map } = await postcss(unmodifiedCSS, {
    production,
    srcFile,
    outFile,
  });

  if (map) {
    await fs.writeFile(sourceMapFile, map.toString());
  }

  await fs.writeFile(outFile, css);
}

function createVariableMap(variables: IHackedVariableValue[]) {
  return variables.reduce((obj, { name, value }) => {
    obj[name] = Array.isArray(value) ? createVariableMap(value) : value;

    return obj;
  }, {});
}

export async function createScssVariables() {
  const fileName = path.join(src, scssVariables);

  log(
    "Attempting to find all scss variables in the this project along with their default values."
  );
  log();
  const packageName = await getPackageName();
  const unformattedVariables = await getPackageVariables();
  const variables = unformattedVariables.map(variable =>
    hackSCSSVariableValue(variable, packageName)
  );

  if (!variables.length) {
    log("No variables found");
    return;
  }

  log(
    "Creating a typescript file to be compiled that contains a list of " +
      "all the scss variables in this project along with their default values."
  );
  log();

  const contents = await format(
    `/** this is an auto-generated file from @react-md/dev-utils */
export default ${JSON.stringify(createVariableMap(variables))};
`,
    path.join(projectRoot, "packages", fileName)
  );
  await fs.writeFile(fileName, contents);
  log(`Created ${fileName} with ${variables.length} variables defined.`);
  log(list(variables.map(({ name, value }) => `$${name}: ${value}`)));
  log();
}
