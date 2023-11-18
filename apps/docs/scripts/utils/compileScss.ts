import postcss from "postcss";
import { compileString } from "sass";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import cssnanoPresetDefault from "cssnano-preset-default";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

const FILE_URL = "file://";
const RMD_CORE = "@react-md/core";
const RMD_CORE_DIST = `node_modules/${RMD_CORE}/dist`;

/**
 * How the fuck does this work normally? I should really look through that code
 * at some point.
 */
export async function compileScss(css: string): Promise<string> {
  const cwd = process.cwd();
  const compiled = compileString(css, {
    importers: [
      {
        canonicalize(url) {
          if (url.startsWith("sass:")) {
            return null;
          }

          if (!url.startsWith(FILE_URL)) {
            return new URL(`${FILE_URL}${cwd}/_${url}.scss`);
          }

          if (url.endsWith(RMD_CORE)) {
            return new URL(`${FILE_URL}${cwd}/${RMD_CORE_DIST}/_core.scss`);
          }

          if (!url.includes(RMD_CORE_DIST) && url.includes(RMD_CORE)) {
            url = url.replace(RMD_CORE, RMD_CORE_DIST);
          }

          const fileName = basename(url);
          return new URL(
            url.replace(new RegExp(`${fileName}$`), `_${fileName}.scss`)
          );
        },
        load(source) {
          const contents = readFileSync(source.pathname, "utf8");
          return {
            syntax: "scss",
            contents,
          };
        },
      },
    ],
  });

  const result = await postcss([
    cssnano({
      preset: cssnanoPresetDefault(),
      plugins: [autoprefixer],
    }),
  ]).process(compiled.css, {
    from: "./theme.css",
  });

  return result.css;
}
