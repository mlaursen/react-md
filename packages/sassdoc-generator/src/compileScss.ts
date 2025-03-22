import { readFileSync } from "node:fs";
import { join } from "node:path";
import { type Importer, type StringOptions, compileString } from "sass";

const FILE_URL = "file://";

const CACHE = new Map<string, string>();

const canonicalize: Importer<"sync">["canonicalize"] = (url) => {
  // The example files will enter through `button/_button.scss` for example.
  const matches = /(([a-z0-9-]+)\/)*((_)?[a-z0-9-]+(\.scss)?)$/.exec(url);
  if (!matches) {
    throw new Error();
  }

  let filePath = url;
  const [_full, prefixes = "", _p, file, underscore, extension] = matches;
  if (!underscore) {
    filePath = `${prefixes}_${file}${extension || ".scss"}`;
  } else if (!extension) {
    filePath = `${url}.scss`;
  }

  return new URL(filePath, `${FILE_URL}/`);
};

export interface CompileCoreScssOptions extends StringOptions<"sync"> {
  src: string;
  scss: string;
  path: string;
  getCurrentPathContents: (contents: string) => string;
}

export function compileScss(options: CompileCoreScssOptions): string {
  const { src, scss, path, getCurrentPathContents, ...remaining } = options;

  const results = compileString(scss, {
    ...remaining,
    importers: [
      {
        canonicalize,
        load(source) {
          const fileName = join(src, source.pathname);
          const rawScss = CACHE.get(fileName) || readFileSync(fileName, "utf8");
          CACHE.set(fileName, rawScss);

          let contents = rawScss;
          if (!contents.includes("sass:map")) {
            contents = `@use "sass:map";
${contents}`;
          }
          if (!contents.includes("sass:meta")) {
            contents = `@use "sass:meta";
${contents}`;
          }

          if (source.pathname === `/${path}`) {
            contents = getCurrentPathContents(contents);
          }

          return {
            syntax: "scss",
            contents,
          };
        },
      },
    ],
  });

  return results.css;
}

export function clearScssCache(): void {
  CACHE.clear();
}
