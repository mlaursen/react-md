import * as fs from "fs-extra";
import * as path from "path";
import { parse } from "sassdoc";

import { PACKAGES_FOLDER, DOCUMENTATION_FOLDER } from "../constants";
import readdir from "../utils/readdir";

async function moveStyles() {
  const packages = (await readdir(PACKAGES_FOLDER));
}

export default async function sassdoc(packageName: string) {
  const tempStylesFolder = path.join(DOCUMENTATION_FOLDER, "tempStyles");
  const docs = await parse(tempStylesFolder);
  return docs.reduce((sassdocs, doc) => {
    const { access, file, ...remaining } = doc;
    if (access === "private") {
      return sassdocs;
    }

    sassdocs.push({
      ...remaining,
      file: {
        name: file.name,
        path: `src/${file.path}`,
      },
    });

    return sassdocs;
  }, []);
}
