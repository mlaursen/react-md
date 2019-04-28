import fs from "fs-extra";
import { flattenDeep } from "lodash";
import path from "path";
import { compileScss, postcss } from "./compileScss";
import { cssDist, dist, scssVariables, src, stylesScss } from "./paths";
import getPackageVariables from "./sassdoc/getPackageVariables";
import {
  getHackedScssVariableValues,
  HackedVar,
  HackedVariable,
  HackedVariablePrimitive,
} from "./sassdoc/variables";
import {
  copyFiles,
  format,
  getPackageName,
  glob,
  list,
  log,
  printSizes,
  time,
} from "./utils";

/**
 * Attempts to run the styles "build" for the current project this is being run in.
 * A build will include:
 * - copying all the scss files to the `dist` folder
 * - generating a `dist/scssVariables.js` file for all the variable values
 * - compiling the default styles for the package for development and production
 * - generating all the theme styles for development and production if running in the base react-md package
 *
 * If the package does not have any styles, the logic is skipped.
 */
export default async function styles() {
  const scssFiles = await glob("src/**/*.scss");
  if (!scssFiles.length) {
    return;
  }

  await copyFiles(scssFiles, dist);
  await createScssVariables();
  const packageName = await getPackageName();
  const found = scssFiles.find(name => /styles\.scss$/.test(name));
  if (!found || packageName === "react-md") {
    // want to use the generated themes for the base react-md package instead
    return;
  }

  await compile({ production: false, fileName: packageName });
  await compile({ production: true, fileName: packageName });
}

interface CompileOptions {
  data?: string;
  fileName: string;
  production: boolean;
}

/**
 * Compiles the current package's code by including the `src/styles.scss` file. This can be run for
 * production or development. The compiled styles will also be processed by postcss with the
 * different plugins.
 */
async function compile(options: CompileOptions) {
  const { production, data } = options;
  const fileName = `${options.fileName}${production ? ".min" : ""}.css`;
  const srcFile = path.join(src, stylesScss);
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
    file: data ? undefined : srcFile,
    data,
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

function createVariableMapOrList(
  variables: (HackedVariablePrimitive | HackedVariable)[]
) {
  if (variables[0] === null || typeof variables[0] !== "object") {
    return variables as HackedVariablePrimitive[];
  }

  return createVariableMap(variables as HackedVar[]);
}

function createVariableMap(variables: HackedVar[]) {
  return variables.reduce((obj, { name, value }) => {
    obj[name] = Array.isArray(value) ? createVariableMapOrList(value) : value;

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
  const variables = getHackedScssVariableValues(
    unformattedVariables,
    packageName
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

  const contents = format(
    `/** this is an auto-generated file from @react-md/dev-utils */
export default ${JSON.stringify(createVariableMap(variables))};
`
  );
  await fs.writeFile(fileName, contents);
  log(`Created ${fileName} with ${variables.length} variables defined.`);
  log(list(variables.map(({ name, value }) => `$${name}: ${value}`)));
  log();
}

function createThemeOptions(theme: string) {
  const [primary, secondary, accent, type] = theme.split("-");
  const options = {
    fileName: `react-md.${theme}`,
    data: `@import '@react-md/theme/dist/color-palette';

$rmd-theme-primary: $rmd-${primary.replace("_", "-")}-500;
$rmd-theme-secondary: $rmd-${secondary.replace("_", "-")}-a-${accent};
$rmd-theme-light: ${type === "light"};

@import 'src/styles';
`,
  };

  return options;
}

/**
 * Generates all the theme styles for the base "react-md" package. It will create
 * a development and production version of each color and theme as well as a light
 * and dark version.
 */
export async function generateThemeStyles() {
  const packageName = await getPackageName();
  if (packageName !== "react-md") {
    return;
  }

  const themes = [
    "indigo-pink-200-light",
    "indigo-pink-200-dark",
    "purple-pink-200-light",
    "purple-pink-200-dark",
    "teal-pink-200-light",
    "teal-pink-200-dark",
    "light_blue-deep_orange-200-light",
    "light_blue-deep_orange-700-dark",
  ];

  log(`Generating the default ${themes.length} themes for production...`, true);

  await time(
    () =>
      Promise.all(
        themes.map(theme =>
          compile({ production: true, ...createThemeOptions(theme) })
        )
      ),
    "generating themes"
  );

  const themeFiles = await glob("dist/css/*.min.css");
  printSizes(themeFiles, "", true);
  log("", true);
}
