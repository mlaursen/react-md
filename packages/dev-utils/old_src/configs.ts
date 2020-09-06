/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { remove } from "fs-extra";
import { merge } from "lodash";
import { join } from "path";

import { packagesRoot } from "./constants";
import format from "./utils/format";
import getPackageJson from "./utils/getPackageJson";
import getPackages, {
  NO_SCRIPT_PACKAGES,
  NO_STYLES_PACKAGES,
} from "./utils/getPackages";
import glob from "./utils/glob";
import { JSONObject } from "./utils/json";
import writeFile from "./utils/writeFile";

type TSConfigType = "ejs" | "cjs" | "var";

const BASE_ESJ_CONFIG = {
  extends: "../../tsconfig.base.json",
  compilerOptions: {
    rootDir: "src",
    outDir: "es",
    declaration: true,
    declarationDir: "types",
  },
  include: ["src"],
  exclude: ["**/__tests__/*", "**/scssVariables.ts"],
};

const BASE_CJS_CONFIG = {
  ...BASE_ESJ_CONFIG,
  compilerOptions: {
    module: "commonjs",
    skipLibCheck: true,
    rootDir: "src",
    outDir: "lib",
  },
};

const SCSS_VARIABLES_CONFIG = {
  extends: "../../tsconfig.base.json",
  compilerOptions: {
    rootDir: "src",
    outDir: "dist",
    declaration: true,
    skipLibCheck: true,
    module: "commonjs",
  },
  include: ["src/scssVariables.ts"],
};

function createTSConfig(
  type: TSConfigType,
  dependencies: string[]
): JSONObject {
  if (type === "var") {
    return SCSS_VARIABLES_CONFIG;
  }

  const config = type === "ejs" ? BASE_ESJ_CONFIG : BASE_CJS_CONFIG;

  if (!dependencies.length) {
    return config;
  }

  return merge({}, config, {
    compilerOptions: {
      baseUrl: ".",
      paths: {
        "@react-md/*": ["../*"],
      },
    },
    references: dependencies.map((name) => ({
      path: `../${name.substring(name.indexOf("/") + 1)}/tsconfig.${type}.json`,
    })),
  });
}

function writeJson(path: string, json: JSONObject): Promise<void> {
  return writeFile(path, format(JSON.stringify(json), "json"));
}

async function writeRoot(type: TSConfigType): Promise<void> {
  const configs = await glob(`packages/*/tsconfig.${type}.json`);
  const references = configs.map((path) => ({
    path: `./packages/${path.substring(
      path.indexOf("/") + 1,
      path.lastIndexOf("/")
    )}/tsconfig.${type}.json`,
  }));

  return writeJson(`tsconfig.${type}.json`, { files: [], references });
}

export default async function configs(): Promise<void> {
  const packages = getPackages(true);
  const existingConfigs = await glob(
    `packages/+(${packages.join("|")})/tsconfig.+(ejs|cjs|var).json`
  );
  await Promise.all(existingConfigs.map((path) => remove(path)));

  await Promise.all(
    packages.flatMap((name) => {
      const packageJson = getPackageJson(name);

      const dependencies = Object.keys(packageJson.dependencies || {}).filter(
        (key) => key.startsWith("@react-md") && !NO_SCRIPT_PACKAGES.test(key)
      );

      const path = join(packagesRoot, name);
      const promises: Promise<void>[] = [];
      if (!NO_STYLES_PACKAGES.test(name) && name !== "react-md") {
        const varConfig = createTSConfig("var", []);
        promises.push(writeJson(join(path, "tsconfig.var.json"), varConfig));
      }

      if (!NO_SCRIPT_PACKAGES.test(name)) {
        const ejsConfig = createTSConfig("ejs", dependencies);
        const cjsConfig = createTSConfig("cjs", dependencies);
        promises.push(
          writeJson(join(path, "tsconfig.ejs.json"), ejsConfig),
          writeJson(join(path, "tsconfig.cjs.json"), cjsConfig)
        );
      }

      return promises;
    })
  );

  await Promise.all([writeRoot("ejs"), writeRoot("cjs"), writeRoot("var")]);
}
