import { lstatSync, readdirSync, readJson } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import type { PackageJson, PackageType } from "../constants";
import {
  NO_SCRIPT_PACKAGES,
  NO_STYLES_PACKAGES,
  packagesRoot,
  projectRoot,
} from "../constants";

let packages: string[];
let scssPackages: string[];
let typescriptPackages: string[];
const VERSIONS = new Map<string, string>();
const DEPENDENCIES = new Map<string, readonly string[]>();

export async function getPackageJson(
  packageName: string
): Promise<PackageJson> {
  let prefix = join(packagesRoot, packageName);
  if (packageName === "root") {
    prefix = projectRoot;
  }

  return readJson(join(prefix, "package.json"));
}

/**
 * Gets all the dependency names for a package.
 */
export async function getDependencies(
  packageName: string,
  dev = false
): Promise<readonly string[]> {
  if (DEPENDENCIES.has(packageName)) {
    const deps = DEPENDENCIES.get(packageName);
    if (deps !== undefined) {
      return deps;
    }
  }

  const packageJson = await getPackageJson(packageName);
  const key = dev ? "devDependencies" : "dependencies";
  const deps = Object.keys(packageJson[key] || {});
  DEPENDENCIES.set(packageName, deps);

  return deps;
}

const withoutCarot = (v: string): string => v.replace(/\^|~/, "");

export async function loadDependenciesOf(
  packageName: string,
  dev = false
): Promise<void> {
  const packageJson = await getPackageJson(packageName);
  const key = dev ? "devDependencies" : "dependencies";
  const deps = packageJson[key] || {};
  Object.entries(deps).forEach(([name, version]) => {
    version = withoutCarot(version);
    const existing = VERSIONS.get(name);
    if (VERSIONS.has(name) && existing !== version) {
      log.warn(
        `${name} already has a verion set to ${existing} but tried to set as ${version}`
      );
    }
    VERSIONS.set(name, version);
  });
}

export async function getAllVersions(): Promise<typeof VERSIONS> {
  await loadDependenciesOf("root", false);
  await loadDependenciesOf("root", true);
  await loadDependenciesOf("documentation", false);
  await loadDependenciesOf("documentation", true);

  return VERSIONS;
}

/**
 * Gets the current root lerna version.
 */
export async function getLernaVersion(): Promise<string> {
  const lernaJsonPath = join(projectRoot, "lerna.json");
  if (VERSIONS.has(lernaJsonPath)) {
    const value = VERSIONS.get(lernaJsonPath);
    if (value !== undefined) {
      return value;
    }
  }

  const lernaJson = await readJson(lernaJsonPath);
  const { version } = lernaJson;
  log.debug(`lerna version: ${version}`);
  if (typeof version !== "string") {
    throw new Error("Invalid lerna version.");
  }

  VERSIONS.set(lernaJsonPath, version);
  return version;
}

/**
 * Gets all the react-md packages by a specific type:
 *
 * - packages without styles
 * - packages without typescript/javascript
 * - all scoped packages
 * - the root `react-md` package and all scoped packages
 */
export function getPackages(type: PackageType = false): readonly string[] {
  if (!packages) {
    packages = readdirSync(packagesRoot).filter(
      (file) =>
        lstatSync(join(packagesRoot, file)).isDirectory() &&
        !/dev-utils|documentation|react-md|codemod/.test(file)
    );
  }

  switch (type) {
    case "scss":
      if (!scssPackages) {
        scssPackages = packages.filter(
          (name) => !NO_STYLES_PACKAGES.test(name)
        );
      }

      return scssPackages;
    case "typescript":
      if (!typescriptPackages) {
        typescriptPackages = packages.filter(
          (name) => !NO_SCRIPT_PACKAGES.test(name)
        );
      }

      return typescriptPackages;
    case false:
      return packages;
    default:
      return [...packages, "react-md"];
  }
}
