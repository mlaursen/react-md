import combineMediaQueries from "css-mqpacker";
import cssnano from "cssnano";
import log from "loglevel";
import nodeSass from "node-sass";
import nodePostcss from "postcss";
import combineDuplicatedSelectors from "postcss-combine-duplicated-selectors";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssPresetEnv from "postcss-preset-env";
import sorting from "postcss-sorting";

import { rootNodeModules, src } from "./paths";
import { list } from "./utils";

export interface CompileOptions extends nodeSass.SyncOptions {
  customIncludePaths?: string[];
}

export function compileScss(
  options: CompileOptions,
  exit: boolean = true
): nodeSass.Result {
  try {
    const { includePaths = [src], customIncludePaths, ...opts } = options;
    return nodeSass.renderSync({
      ...opts,
      includePaths: customIncludePaths || [...includePaths, rootNodeModules],
    });
  } catch (e) {
    if (exit) {
      /* eslint-disable no-console */
      console.error(e.formatted);
      console.error();
      process.exit(1);
    } else {
      throw e;
    }
  }
}

export interface PostCSSOptions {
  production: boolean;
  srcFile: string;
  outFile: string;
}

export function checkForInvalidCSS(css: string): void {
  const matches = css.match(/.*rmd(-[a-z]+)+\(.*\n/);
  if (!matches) {
    return;
  }

  const matchContext = css.match(/(.*\n){0,3}.*rmd(-[a-z]+)+\(.*\n(.*\n){0,3}/);
  log.error(
    "There is invalid compiled css in this bundle. Please check the scss files"
  );
  log.error("to try to fix these issues.");
  log.error(list(matches.slice(0, matches.length - 1)));
  log.error("");
  log.error(matchContext[0].trim());
  log.error("");
  process.exit(1);
}

export async function postcss(
  css: string,
  { production, srcFile, outFile }: PostCSSOptions
): Promise<nodePostcss.Result> {
  log.debug("Running postcss with the following plugins:");
  log.debug(
    list(
      [
        "postcss-preset-env",
        "postcss-flexbugs-fixes",
        "postcss-sorting",
        production && "cssnano",
        production && "postcss-combine-duplicated-selectors",
        production && "css-mqpacker",
      ].filter(Boolean)
    )
  );
  log.debug("");

  const result = await nodePostcss(
    [
      postcssPresetEnv({ stage: 3, autoprefixer: { flexbox: "no-2009" } }),
      postcssFlexbugsFixes(),
      sorting({
        order: ["custom-properties", "declarations"],
        "properties-order": "alphabetical",
        "unspecified-properties-position": "bottom",
      }),
      production && combineMediaQueries(),
      production && combineDuplicatedSelectors,
      production && cssnano({ preset: "default" }),
    ].filter(Boolean)
  ).process(css, {
    from: srcFile,
    to: outFile,
    map: !production && { inline: false },
  });

  checkForInvalidCSS(result.css);

  return result;
}
