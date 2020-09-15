import { lstatSync, readdirSync, readJson } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import {
  NO_SCRIPT_PACKAGES,
  NO_STYLES_PACKAGES,
  PackageJson,
  packagesRoot,
  PackageType,
  projectRoot,
  VersionedDependency,
} from "../constants";

let versionsCacheLoaded = false;
let packages: string[];
let scssPackages: string[];
let typescriptPackages: string[];
const VERSIONS = new Map<string, string>();
const DEPENDENCIES = new Map<string, readonly string[]>();
const VERSIONED_DEPENDENCIES = new Map<
  string,
  readonly VersionedDependency[]
>();

async function getPackageJson(packageName: string): Promise<PackageJson> {
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
  dev: boolean = false
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

export async function getVersionedDependencies(
  packageName: string,
  dev: boolean = false
): Promise<readonly VersionedDependency[]> {
  if (VERSIONED_DEPENDENCIES.has(packageName)) {
    const deps = VERSIONED_DEPENDENCIES.get(packageName);
    if (deps !== undefined) {
      return deps;
    }
  }

  const deps = await getDependencies(packageName, dev);
  const versioned = await Promise.all(
    deps.map(async (name) => {
      // eslint-disable-next-line no-use-before-define
      const version = await getVersion(name);
      return { name, version };
    })
  );

  VERSIONED_DEPENDENCIES.set(packageName, versioned);
  return versioned;
}

async function loadCache(): Promise<void> {
  const rootDeps = await getVersionedDependencies("root", false);
  const rootDevDeps = await getVersionedDependencies("root", true);
  const docDeps = await getVersionedDependencies("documentation", false);
  const docDevDeps = await getVersionedDependencies("documentation", true);
  [...rootDeps, ...rootDevDeps, ...docDeps, ...docDevDeps].forEach(
    ({ name, version }) => {
      if (VERSIONS.has(name)) {
        if (VERSIONS.get(name) !== version) {
          log.error("Different versions?", name, version, VERSIONS.get(name));
        }

        return;
      }

      VERSIONS.set(name, version);
    }
  );

  versionsCacheLoaded = true;
}

/**
 * Gets the version for one of the packages.
 */
export async function getVersion(packageName: string): Promise<string> {
  if (VERSIONS.has(packageName)) {
    const value = VERSIONS.get(packageName);
    if (value !== undefined) {
      return value;
    }
  }

  if (!versionsCacheLoaded) {
    await loadCache();
  }

  const value = VERSIONS.get(packageName);
  if (value === undefined) {
    throw new Error(`${packageName} does not have a valid version`);
  }

  return value;
}

/**
 * Gets the current root lerna version.
 */
export async function getLernaVersion(): Promise<string | null> {
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
        !/dev-utils|documentation|react-md/.test(file)
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
