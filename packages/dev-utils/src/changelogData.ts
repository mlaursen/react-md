import { writeFile } from "fs-extra";
import { join } from "path";
import { packagesRoot } from "./constants";
import {
  format,
  getAllReactMDExports,
  getAllVersions,
  getPackages,
  loadDependenciesOf,
} from "./utils";

export async function updateChangelogData(): Promise<void> {
  const outputPath = join(packagesRoot, "dev-utils", "changelogData.js");
  const rmdExports = getAllReactMDExports();
  await loadDependenciesOf("dev-utils", false);
  await loadDependenciesOf("dev-utils", true);
  await loadDependenciesOf("react-md", false);
  await loadDependenciesOf("react-md", true);
  const versions = await getAllVersions();

  const tokens = Array.from(
    new Set([
      ...rmdExports,
      ...Array.from(versions.keys()),
      "dist/scssVariables",
      "sassdoc",
      "react-md",
      "create-react-app",
      "actions/setup-node",
      "actions/labeler",
      "@testing-library/\\*",
    ])
  );

  await writeFile(
    outputPath,
    format(`/* eslint-disable */
module.exports.tokens = ${JSON.stringify(tokens)}

module.exports.packages = ${JSON.stringify(getPackages())}
`)
  );
}
