import fs from "fs-extra";
import path from "path";
import { promisify } from "util";
import nodeGlob from "glob";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import sorting from "postcss-sorting";
import uglifycss from "uglifycss";

import compileScss from "./compileScss";
import { dist } from "./paths";
import { copyFiles, getPackageName, list, log } from "./utils";
import { getPackageVariables, hackVariableValue } from "./sassdoc";

const glob = promisify(nodeGlob);

export default async function styles() {
  const scssFiles = await glob("src/**/*.scss");
  if (!scssFiles.length) {
    return;
  }

  await copyFiles(scssFiles, dist);
  const found = scssFiles.find(name => /styles\.scss$/.test(name));
  if (!found) {
    return;
  }

  log("Compiling src/styles.scss with the following postcss plugins:");
  log(
    list(["postcss-preset-env", "postcss-flexbugs-fixes", "postcss-sorting"])
  );
  log();
  await compile(false);
  await compile(true);

  await createScssVariables();
}

async function compile(production: boolean) {
  const packageName = await getPackageName();
  const srcFile = path.join("src", "styles.scss");
  const fileName = `precompiled-${packageName}${production ? ".min" : ""}.css`;
  const outFile = path.join("dist", fileName);
  const sourceMapFile = `${outFile}.map`;

  if (!production) {
    log("Compiling a development css bundle along with a sourcemap to:");
    log(list([outFile, !production && sourceMapFile]));
    log();
  }

  try {
    const compiledScss = compileScss({
      file: srcFile,
      outFile,
      sourceMap: !production,
      outputStyle: "expanded",
    });

    const postcssResult = await postcss([
      postcssPresetEnv({ stage: 3, autoprefixer: { flexbox: "no-2009" } }),
      postcssFlexbugsFixes(),
      sorting({
        order: ["custom-properties", "declarations"],
        "properties-order": "alphabetical",
        "unspecified-properties-position": "bottom",
      }),
    ]).process(compiledScss.css, {
      from: srcFile,
      to: outFile,
      map: !production && { inline: false },
    });

    if (postcssResult.map) {
      await fs.writeFile(sourceMapFile, postcssResult.map.toString());
    }

    let { css } = postcssResult;
    if (production) {
      css = uglifycss.processString(css);
    }

    checkForInvalidCSS(css);
    await fs.writeFile(outFile, css);
  } catch (e) {
    console.error(`node-sass compilation error for \`${srcFile}\``);
    console.error(e.formatted);
    console.error();
    throw e;
  }
}

function checkForInvalidCSS(css: string) {
  const matches = css.match(/.*rmd(-[a-z]+)+\(.*\n/);
  if (!matches) {
    return;
  }

  const matchContext = css.match(/(.*\n){0,3}.*rmd(-[a-z]+)+\(.*\n(.*\n){0,3}/);
  console.error(
    "There is invalid compiled css in this bundle. Please check the scss files"
  );
  console.error("to try to fix these issues.");
  console.error(list(matches.slice(0, matches.length - 1)));
  console.error();
  console.error("Context:");
  console.error();
  console.error("```scss");
  console.error(matchContext[0].trim());
  console.error("```");
  console.error();
  const error = new Error();
  console.error(error.stack);
  throw error;
}

async function createScssVariables() {
  const fileName = path.join(dist, "scssVariables.js");

  log("Creating a typescript file to be compiled that contains a list of");
  log(
    "all the scss variables in this project along with their default values."
  );
  log();
  const packageName = await getPackageName();
  const unformattedVariables = await getPackageVariables();
  const variables = unformattedVariables.map(variable =>
    hackVariableValue(variable, packageName)
  );

  const contents = `module.exports = ${JSON.stringify(variables)};`;
  await fs.writeFile(fileName, contents);
  log(`Created ${fileName} with ${variables.length} variables defined.`);
  log();
}
