import rootPackageJson from "../../../package.json";
import packageJson from "../package.json";

const {
  bugs: { url },
  homepage,
  version,
} = rootPackageJson;

export const GITHUB_URL = url.replace(/\/issues/, "");
export const GITHUB_FILE_URL = `${GITHUB_URL}/tree/next`;
export const GITHUB_DOC_PREFIX = `${GITHUB_FILE_URL}/packages/documentation`;
export const GITHUB_DEMO_URL = `${GITHUB_DOC_PREFIX}/components/Demos`;
export const HOMEPAGE = homepage;
export const VERSION = version;

export const PACKAGES = Object.entries(packageJson.dependencies)
  .filter(([k]) => k.startsWith("@react-md"))
  .map(([name, version]) => ({
    name,
    version: version.replace(/([^0-9])+/, ""),
  }));

interface PackagesRecord {
  [key: string]: string;
}

export const PACKAGES_RECORD: PackagesRecord = PACKAGES.reduce(
  (obj, { name, version }) => ({
    ...obj,
    [name]: version,
  }),
  {}
);

export const PACKAGE_NAMES = Object.keys(PACKAGES_RECORD).map(
  name => `${name.substring(name.indexOf("/") + 1)}`
);

export const CODE_SANDBOX_DEFINE_API =
  "https://codesandbox.io/api/v1/sandboxes/define";

export const GA_CODE = process.env.GA_CODE || "UA-76079335-2";
export const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_CODE}`;
