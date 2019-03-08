import rootPackageJson from "../../../package.json";
import packageJson from "../package.json";

const {
  bugs: { url },
  homepage,
  version,
} = rootPackageJson;

export const GITHUB_URL = url.replace(/\/issues/, "");
export const HOMEPAGE = homepage;
export const VERSION = version;

export const PACKAGES = Object.entries(packageJson.dependencies)
  .filter(([k]) => k.startsWith("@react-md"))
  .map(([name, version]) => ({
    name,
    version: version.replace(/([^0-9])+/, ""),
  }));

interface IPackagesRecord {
  [key: string]: string;
}

export const PACKAGES_RECORD: IPackagesRecord = PACKAGES.reduce(
  (obj, { name, version }) => ({
    ...obj,
    [name]: version,
  }),
  {}
);

export const PACKAGE_NAMES = Object.keys(PACKAGES_RECORD).map(
  name => `${name.substring(name.indexOf("/") + 1)}`
);
