import path from "path";

import { PACKAGES_FOLDER } from "../../constants";

export const LIBRARY_TYPEDOC_FILE_NAME = "libraryTypedoc.json";
export const LIBRARY_TYPEDOC_FILE_PATH = path.join(process.cwd(), LIBRARY_TYPEDOC_FILE_NAME);

export const TEMP_TYPEDOC_LIB_FOLDER = path.join(process.cwd(), "tempLib");
export const TEMP_TYPEDOC_FILE_NAME = "temp.library.json";
