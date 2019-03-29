import fs from "fs-extra";
import path from "path";

import { compileScss, postcss } from "./compileScss";
import { documentationRoot } from "./paths";
import { time } from "./utils";

async function compile() {
  const srcFile = path.join(documentationRoot, "pages", "app.scss");
  const outFile = path.join(documentationRoot, "pages", "app.css");
  const sourceMapFile = `${outFile}.map`;
  const unmodifiedCSS = compileScss({
    file: srcFile,
    outFile,
    includePaths: [documentationRoot],
    sourceMap: true,
    outputStyle: "expanded",
  }).css.toString();

  const { css, map } = await postcss(unmodifiedCSS, {
    production: false,
    srcFile,
    outFile,
  });

  if (map) {
    await fs.writeFile(sourceMapFile, map.toString());
  }

  await fs.writeFile(outFile, css);
}

export default async function docStyles() {
  time(compile, "compile doc styles");
}
