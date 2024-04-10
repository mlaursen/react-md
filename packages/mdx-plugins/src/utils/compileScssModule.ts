import { getFakeCssModuleClassName } from "@react-md/code/fakeCssModules";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";
import { compileString, type StringOptions } from "sass";

const LOCAL_SCOPE = ":local";
const GLOBAL_SCOPE = ":global";
const FILE_URL = "file://";

export type CompileScssModuleOptions = StringOptions<"sync"> & {
  scss: string;
  baseName: string;
  load(fileUrl: string): string;
};

function getFileName(url: string): string {
  // can't use `path.parse(url).name` since this can be run in the browser
  const fileName = url.split("/").at(-1) ?? "";
  const dotIndex = fileName.indexOf(".");
  if (dotIndex !== -1) {
    return fileName.substring(0, dotIndex);
  }

  return fileName;
}

export function compileScssModule(options: CompileScssModuleOptions): string {
  const { scss, load, baseName, ...compileOptions } = options;

  const compiled = compileString(scss, {
    ...compileOptions,
    importers: [
      {
        canonicalize(url) {
          if (url.startsWith(FILE_URL)) {
            return new URL(`_${getFileName(url)}.scss`, url);
          }

          return new URL(url, `${FILE_URL}/`);
        },
        load(source) {
          return {
            syntax: "scss",
            contents: load(source.href),
          };
        },
      },
    ],
  });

  const parsed = postcss.parse(compiled.css);
  const processor = selectorParser((root) => {
    let prevScope = LOCAL_SCOPE;
    root.walk((node) => {
      switch (node.type) {
        case "pseudo":
          if (node.value === LOCAL_SCOPE || node.value === GLOBAL_SCOPE) {
            prevScope = node.value;
            const { parent, nodes } = node;
            if (parent && nodes.length) {
              nodes.forEach((childNode) => {
                parent.insertBefore(node, childNode);
              });
            }
            node.remove();
          }
          break;
        case "class":
          if (prevScope === LOCAL_SCOPE) {
            node.value = getFakeCssModuleClassName(baseName, node.value);
          }
          break;
      }
    });
  });
  parsed.walkRules((rule) => {
    processor.processSync(rule, {
      lossless: false,
      updateSelector: true,
    });
  });

  return parsed.toResult().css;
}
