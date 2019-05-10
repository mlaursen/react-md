import fs from "fs-extra";
import path from "path";

import { compileScss } from "./compileScss";
import { documentationRoot } from "./paths";
import { time } from "./utils";

async function compile() {
  const srcFile = path.join(documentationRoot, "pages", "app.scss");
  const outFile = path.join(documentationRoot, "pages", "app.css");
  const sourceMapFile = `${outFile}.map`;
  const { map, css } = compileScss({
    file: srcFile,
    outFile,
    includePaths: [documentationRoot],
    sourceMap: true,
    outputStyle: "expanded",
  });

  if (map) {
    await fs.writeFile(sourceMapFile, map.toString());
  }

  await fs.writeFile(outFile, css.toString());
}

export default async function docStyles() {
  time(compile, "compile doc styles");
}
