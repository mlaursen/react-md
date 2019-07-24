import fs from "fs-extra";
import { flattenDeep } from "lodash";
import path from "path";
import log from "loglevel";

import { compileScss, postcss } from "./compileScss";
import {
  cssDist,
  dist,
  scssVariables,
  src,
  stylesScss,
  scssDist,
} from "./paths";
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
  printSizes,
  time,
} from "./utils";

/**
 * Compiles the current package's code by including the `src/styles.scss` file. This can be run for
 * production or development. The compiled styles will also be processed by postcss with the
 * different plugins.
 */
async function compile(options: CompileOptions): Promise<void> {
  const { production, data } = options;
  const fileName = `${options.fileName}${production ? ".min" : ""}.css`;
  const srcFile = path.join(scssDist, stylesScss);
  const outFile = path.join(cssDist, fileName);
  const sourceMapFile = `${outFile}.map`;
  log.info("Compiling the main css bundle.");

  await fs.ensureDir(cssDist);
  if (!production) {
    log.debug("Compiling a development css bundle along with a sourcemap to:");
    log.debug(list([outFile, sourceMapFile]));
    log.debug("");
  } else {
    log.debug("Compiling a production css bundle to:");
    log.debug(list([outFile]));
    log.debug("");
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

async function copyStyles(files: string[]): Promise<void> {
  log.info(
    "Copying the scss files for both webpack imports and includePaths options."
  );

  const packageName = await getPackageName();

  await copyFiles(files, dist);
  await fs.ensureDir(scssDist);
  if (packageName === "form") {
    // the form package puts the styles into different folders, so make sure all of them are
    // created in the dist folder as well.
    await Promise.all([
      fs.ensureDir(path.join(scssDist, "file-input")),
      fs.ensureDir(path.join(scssDist, "label")),
      fs.ensureDir(path.join(scssDist, "select")),
      fs.ensureDir(path.join(scssDist, "text-field")),
      fs.ensureDir(path.join(scssDist, "toggle")),
    ]);
  }

  await Promise.all(
    files.map(async pathname => {
      const contents = fs.readFileSync(pathname, "utf8");
      const webpackImports = contents
        .replace(/~@react-md/g, "@react-md")
        .replace(/dist\//g, `${scssDist}/`);

      const fileName = pathname.replace(src, scssDist);
      log.debug(`- ${pathname} -> ${fileName}`);
      return fs.writeFile(fileName, webpackImports, "utf8");
    })
  );
}

function createVariableMap(
  variables: HackedVar[]
): Record<string, HackedVar[]> {
  return variables.reduce((obj, { name, value }) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    obj[name] = Array.isArray(value) ? createVariableMapOrList(value) : value;

    return obj;
  }, {});
}

function createVariableMapOrList(
  variables: (HackedVariablePrimitive | HackedVariable)[]
): HackedVariablePrimitive[] | Record<string, HackedVar[]> {
  if (variables[0] === null || typeof variables[0] !== "object") {
    return variables as HackedVariablePrimitive[];
  }

  return createVariableMap(variables as HackedVar[]);
}

export async function createScssVariables(): Promise<void> {
  const fileName = path.join(src, scssVariables);

  log.info("Finding scss variables to compile their default values.");
  const packageName = await getPackageName();
  const unformattedVariables = await getPackageVariables();
  const variables = getHackedScssVariableValues(
    unformattedVariables,
    packageName
  );

  if (!variables.length) {
    log.warn(`No SCSS variables found in ${packageName}`);
    return;
  }

  const contents = format(
    `/** this is an auto-generated file from @react-md/dev-utils */
export default ${JSON.stringify(createVariableMap(variables))};
`
  );
  await fs.writeFile(fileName, contents);
  log.info(`Created ${fileName} with ${variables.length} variables defined.`);
  log.debug(list(variables.map(({ name, value }) => `$${name}: ${value}`)));
  log.debug();
}

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
export default async function styles(css: boolean): Promise<void> {
  const scssFiles = await glob("src/**/*.scss");
  if (!scssFiles.length) {
    return;
  }

  await copyStyles(scssFiles);
  await createScssVariables();
  if (!css) {
    return;
  }

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

function createThemeOptions(theme: string): { fileName: string; data: string } {
  const [primary, secondary, accent, type] = theme.split("-");
  const options = {
    fileName: `react-md.${theme}`,
    data: `@import '@react-md/theme/dist/scss/color-palette';

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
export async function generateThemeStyles(): Promise<void> {
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

  log.info(`Generating the default ${themes.length} themes for production...`);

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
  printSizes(themeFiles);
}
