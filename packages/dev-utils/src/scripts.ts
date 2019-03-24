import fs from "fs-extra";
import path from "path";
import { camelCase, upperFirst } from "lodash";

import {
  src,
  es,
  lib,
  types,
  rollupConfig,
  tsConfigRollup,
  tsConfigCommonJS,
  tsConfigESModule,
  tempRollupIndex,
  rootNodeModules,
  umdDist,
  tsConfigVariables,
} from "./paths";
import {
  glob,
  createTsConfig,
  getPackageName,
  exec,
  copyFiles,
  list,
  log,
} from "./utils";

export default async function scripts(umd: boolean) {
  const allTsFiles = await glob(`${src}/**/*.+(ts|tsx)`);
  const tsFiles = allTsFiles.filter(
    filePath => !filePath.includes("__tests__")
  );
  if (!tsFiles.length) {
    return;
  }

  if (tsFiles.find(name => name.includes("scssVariables"))) {
    await tscVariables();
  }

  if (tsFiles.length === 1 && tsFiles[0].includes("scssVariables")) {
    log(
      "Skipping typescript compilation since this package only contains a " +
        "`scssVariables.ts` file."
    );
    log();
    return;
  }

  log("Found typescript files:");
  log(list(tsFiles));
  log();

  await tsc(false);
  await tsc(true);
  await definitions();
  if (umd) {
    await buildUMD();
  }
}

async function tscVariables() {
  const tsConfig = tsConfigVariables;
  await fs.writeJson(tsConfig, createTsConfig("variables"), { spaces: 2 });

  log("Compiling scssVariables...");
  exec(`${rootNodeModules}/typescript/bin/tsc -p ${tsConfig}`);
  // const generated = await glob(`${commonjs ? lib : es}/**/*`);
  // log("Created:");
  // log(list(generated));
  // log();
}

async function tsc(commonjs: boolean) {
  // I am lazy for updating and maintaining each package, so just overwrite the
  // tsconfig with the "real" config each time
  const tsConfig = commonjs ? tsConfigCommonJS : tsConfigESModule;
  await fs.writeJson(
    tsConfig,
    createTsConfig(commonjs ? "commonjs" : "module"),
    { spaces: 2 }
  );

  log(
    `Compiling typescript files for ${commonjs ? "Common JS" : "ES Modules"}...`
  );
  exec(`${rootNodeModules}/typescript/bin/tsc -p ${tsConfig}`);
  const generated = await glob(`${commonjs ? lib : es}/**/*`);
  log("Created:");
  log(list(generated));
  log();
}

async function definitions() {
  const defsToCopy = await glob(`${src}/**/*.d.ts`);
  if (defsToCopy.length) {
    await copyFiles(defsToCopy, types, null);
  }

  const defs = await glob(`${types}/**/*.d.ts`);
  log("Created the following defintiion files:");
  log(list(defs));
  log();
}

// it seems to break when extending the base config for some reason
const ROLLUP_TSCONFIG = {
  compilerOptions: {
    target: "es5",
    module: "es2015",
    jsx: "react",
    lib: ["dom", "dom.iterable", "esnext"],
    noEmit: true,
  },
  include: [src],
  exclude: ["**/__tests__/*"],
};

export async function buildUMD() {
  const packageName = await getPackageName();
  const rollupConfigPath = path.join(process.cwd(), rollupConfig);
  const tsConfigRollupPath = path.join(process.cwd(), tsConfigRollup);
  const tempRollupIndexPath = path.join(process.cwd(), src, tempRollupIndex);

  const umdName = `ReactMD${
    packageName === "react-md" ? "" : upperFirst(camelCase(packageName))
  }`;

  const config = createRollupConfig(packageName, umdName);
  await fs.writeFile(rollupConfigPath, config, "utf8");
  await fs.writeJson(tsConfigRollupPath, ROLLUP_TSCONFIG, { spaces: 2 });

  await createTempRollupFile(tempRollupIndexPath);
  rollup(false);
  rollup(true);

  const files = await glob("+(src|es|lib|dist|types)/rollup*");
  await Promise.all(
    [rollupConfigPath, tsConfigRollupPath, tempRollupIndexPath, ...files].map(
      p => fs.remove(p)
    )
  );
}

/**
 * Need to create a temp rollup index file for building because it'll crash
 * if the package exports any type definition files. This will either just
 * copy the main index file to the temp file name or replace all lines that
 * have the `export * from "./SOMETHING\.d";` and then copy it over.
 */
async function createTempRollupFile(tempRollupIndexPath: string) {
  const indexPath = path.join(src, "index.ts");
  const contents = fs.readFileSync(indexPath, "utf8");

  if (!/\.d"/.test(contents)) {
    return fs.copy(indexPath, tempRollupIndexPath);
  }

  const updated = contents.replace(/export .+\.d";/g, "");
  fs.writeFileSync(tempRollupIndexPath, updated);
}

function rollup(production: boolean) {
  const env = production ? "production" : "development";
  log(`Creating the ${env} UMD bundle...`);
  exec(`${rootNodeModules}/rollup/bin/rollup -c`, {
    env: {
      NODE_ENV: env,
    },
  });
  log();
}

function createRollupConfig(packageName: string, umdName: string) {
  return `const path = require('path');
const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const { uglify } = require('rollup-plugin-uglify');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  input: '${src}/${tempRollupIndex}',
  output: {
    file: \`${umdDist}/${packageName}\${isProduction ? '.production.min' : '.development'}.js\`,
    name: '${umdName}',
    format: 'umd',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    sourcemap: !isProduction,
  },
  onwarn: (warning, warn) => {
    // hide the typescript helpers warnings
    if (warning.code === "THIS_IS_UNDEFINED" && /var \_\_(assign|rest)/.test(warning.frame)) {
      return;
    }

    warn(warning);
  },
  external: ['react', 'react-dom'],
  plugins: [
    typescript({
      check: false,
      tsconfig: '${tsConfigRollup}',
      cacheRoot: path.join(process.cwd(), '..', '..', 'node_modules', '.rts2Cache', '${packageName}'),
    }),
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    isProduction && uglify(),
  ].filter(Boolean)
};
`;
}
