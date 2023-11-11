import { SCSS_LOOKUP } from "@/constants/scssLookup.js";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";
import { compileString } from "sass";
import { getFakeScssModuleClassName } from "./fakeScssModules.js";

const LOCAL_SCOPE = ":local";
const GLOBAL_SCOPE = ":global";

export interface CompileScssModuleOptions {
  scss: string;
  baseName: string;
}

export async function compileScssModule(
  options: CompileScssModuleOptions
): Promise<string> {
  const { scss, baseName } = options;

  const content = scss.replace(
    /@use ("|')(everything|@react-md)/g,
    "@use $1fake:$2"
  );

  const compiled = compileString(content, {
    importers: [
      {
        canonicalize(url) {
          if (!url.startsWith("fake:")) {
            return null;
          }

          return new URL(url);
        },
        load(source) {
          let name = source.pathname;
          if (name === "@react-md/core/colors") {
            name = "@react-md/colors";
          }

          const contents = SCSS_LOOKUP[name];
          if (process.env.NODE_ENV !== "production" && !contents) {
            throw new Error(`${name} does not exist in SCSS_LOOKUP`);
          }

          return {
            syntax: "scss",
            contents,
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
            node.value = getFakeScssModuleClassName(baseName, node.value);
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
