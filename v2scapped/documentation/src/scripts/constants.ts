import * as path from "path";

export const DOCUMENTATION_FOLDER = process.cwd();
export const DOCUMENTATION_COMPONENTS_FOLDER = path.join(DOCUMENTATION_FOLDER, "src", "components");
export const TEMP_STYLES_FOLDER = path.join(DOCUMENTATION_FOLDER, "tempStyles");
export const TEMP_CHANGELOG_FOLDER = path.join(DOCUMENTATION_FOLDER, "tempChangelogs");
export const PACKAGES_FOLDER = path.join(DOCUMENTATION_FOLDER, "..");
