import fs from "fs-extra";
import path from "path";
import { promisify } from "util";
import nodeGlob from "glob";

import { compileScss, postcss, hackSCSSVariableValue } from "./compileScss";
import { dist, cssDist, src, stylesScss, scssVariables } from "./paths";
import { copyFiles, getPackageName, list, log } from "./utils";
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

async function createScssVariables() {
  const fileName = path.join(dist, scssVariables);

  log("Creating a typescript file to be compiled that contains a list of");
  log(
    "all the scss variables in this project along with their default values."
  );
  log();
  const packageName = await getPackageName();
  const unformattedVariables = await getPackageVariables();
  const variables = unformattedVariables.map(variable =>
    hackSCSSVariableValue(variable, packageName)
  );

  const contents = `module.exports = ${JSON.stringify(variables)};`;
  await fs.writeFile(fileName, contents);
  log(`Created ${fileName} with ${variables.length} variables defined.`);
  log(list(variables.map(({ name, value }) => `$${name}: ${value}`)));
  log();
}
