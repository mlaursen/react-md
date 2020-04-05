import { readdirSync, lstatSync } from "fs";
import { join } from "path";
import { packagesRoot } from "../constants";

let packages: string[];
let scssPackages: string[];
let typescriptPackages: string[];

export const NO_STYLES_PACKAGES = /autocomplete|material-icons|portal/;
// Note: this ignores the scssVariables file
export const NO_SCRIPT_PACKAGES = /elevation|theme/;

export type PackageType = "scss" | "typescript" | boolean;

export default function getPackages(type: PackageType = false): string[] {
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
