import { getFakeCssModuleClassName } from "@react-md/code/fakeCssModules";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";
import { type Importer, type StringOptions, compileString } from "sass";

export const LOCAL_SCOPE = ":local";
export const GLOBAL_SCOPE = ":global";
export const FILE_URL = "file://";

const canonicalize: Importer<"sync">["canonicalize"] = (url) => {
  // The documentation site will either "enter" through
  // `@use "everything";` or `@use "@react-md/core";`
  if (url === "everything") {
    return new URL("_everything.scss", `${FILE_URL}/docs/`);
  }

  if (url === "@react-md/core") {
    return new URL("_core.scss", `${FILE_URL}/@react-md/core/dist/`);
  }

  if (url.endsWith("core/a11y")) {
    return new URL("_a11y.scss", `${FILE_URL}/@react-md/core/dist/`);
  }

  if (url.endsWith("core/colors") || url.endsWith("/dist/@react-md/core")) {
    return new URL("_colors.scss", `${FILE_URL}/@react-md/core/dist/`);
  }

  // NOTE: If the regexp updates, update in getScssCodeFile as well
  const [packageName, packageScope] =
    url.match(/@react-md\/([-a-z0-9]+)$/) || [];
  if (packageScope) {
    return new URL(`_${packageScope}.scss`, `${FILE_URL}/${packageName}/dist/`);
  }

  let urlWithExtension = url;
  if (!urlWithExtension.endsWith(".scss")) {
    urlWithExtension = urlWithExtension.replace(/\/([0-9a-z-]+)$/, "/_$1.scss");
  }
  urlWithExtension = urlWithExtension.replace(
    "docs/@react-md",
    "@react-md/core/dist"
  );

  return new URL(urlWithExtension, url);
};

export type CompileScssOptions = StringOptions<"sync"> & {
  scss: string;
  load(fileUrl: string): string;
};

export function compileScss(options: CompileScssOptions): string {
  const { scss, load, ...compileOptions } = options;

  return compileString(scss, {
    ...compileOptions,
    importers: [
      {
        canonicalize,
        load(source) {
          return {
            syntax: "scss",
            contents: load(source.href),
          };
        },
      },
    ],
  }).css;
}

export type CompileScssModuleOptions = CompileScssOptions & {
  baseName: string;
};

export function compileScssModule(options: CompileScssModuleOptions): string {
  const { baseName, ...compileOptions } = options;

  const compiled = compileScss(compileOptions);
  const parsed = postcss.parse(compiled);
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
