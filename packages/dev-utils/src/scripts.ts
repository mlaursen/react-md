import fs from "fs-extra";
import path from "path";
import { camelCase, upperFirst } from "lodash";

import {
  src,
  es,
  lib,
  dist,
  types,
  rollupConfig,
  tsConfigRollup,
  tsConfigCommonJS,
  tsConfigESModule,
  tempRollupIndex,
} from "./paths";
import {
  glob,
  createTsConfig,
  getPackageName,
  exec,
  copyFiles,
  list,
} from "./utils";

export default async function scripts() {
  const allTsFiles = await glob(`${src}/**/*.+(ts|tsx)`);
  const tsFiles = allTsFiles.filter(
    filePath => !filePath.includes("__tests__")
  );
  if (!tsFiles.length) {
    return;
  }

  console.log("Found typescript files:");
  console.log(list(tsFiles));
  console.log();

  await tsc(false);
  await tsc(true);
  await definitions();
  if (tsFiles.length !== 1) {
    await umd();
  }
}

async function tsc(commonjs: boolean) {
  const tempTsConfig = commonjs ? tsConfigCommonJS : tsConfigESModule;
  await fs.writeJson(
    tempTsConfig,
    createTsConfig(commonjs ? "commonjs" : "module")
  );

  console.log(
    `Compiling typescript files for ${commonjs ? "Common jS" : "ES Modules"}...`
  );
  exec(`npx tsc -p ${tempTsConfig}`);
  await fs.remove(tempTsConfig);
  const generated = await glob(`${commonjs ? lib : es}/**/*`);
  console.log("Created:");
  console.log(list(generated));
  console.log();
}

async function definitions() {
  const defsToCopy = await glob(`${src}/**/*.d.ts`);
  if (defsToCopy.length) {
    await copyFiles(defsToCopy, types, null);
  }

  const defs = await glob(`${types}/**/*.d.ts`);
  console.log("Created the following defintiion files:");
  console.log(list(defs));
  console.log();
}

// it seems to break when extending the base config for some reason
const ROLLUP_TSCONFIG = {
  compilerOptions: {
    target: "es5",
    module: "commonjs",
    jsx: "react",
    lib: ["dom", "es2017"],
    noEmit: true,
  },
  include: [src],
  exclude: ["**/__tests__/*"],
};

async function umd() {
  const packageName = await getPackageName();
  const rollupConfigPath = path.join(process.cwd(), rollupConfig);
  const tsConfigRollupPath = path.join(process.cwd(), tsConfigRollup);
  const tempRollupIndexPath = path.join(process.cwd(), src, tempRollupIndex);

  const umdName = `ReactMD${upperFirst(camelCase(packageName))}`;

  const config = createRollupConfig(packageName, umdName);
  await fs.writeFile(rollupConfigPath, config, "utf8");
  await fs.writeJson(tsConfigRollupPath, ROLLUP_TSCONFIG, { spaces: 2 });

  await createTempRollupFile(tempRollupIndexPath);
  rollup(false);
  rollup(true);

  await Promise.all(
    [rollupConfigPath, tsConfigRollupPath, tempRollupIndexPath].map(filePath =>
      fs.remove(filePath)
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
  console.log(updated);
  fs.writeFileSync(tempRollupIndexPath, updated);
}

function rollup(production: boolean) {
  const env = production ? "production" : "development";
  console.log(`Creating the ${env} UMD bundle...`);
  exec("npx rollup -c", {
    env: {
      NODE_ENV: env,
    },
  });
  console.log();
}

function createRollupConfig(packageName: string, umdName: string) {
  return `const typescript = require('rollup-plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const { uglify } = require('rollup-plugin-uglify');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  input: '${src}/${tempRollupIndex}',
  output: {
    file: \`${dist}/${packageName}\${isProduction ? '.min' : ''}.js\`,
    name: '${umdName}',
    format: 'umd',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    sourcemap: !isProduction,
  },
  external: ['react', 'react-dom'],
  plugins: [
    typescript({
      tsconfig: '${tsConfigRollup}',
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
