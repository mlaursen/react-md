import nodeSass from "node-sass";
import nodePostcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import sorting from "postcss-sorting";
import cssnano from "cssnano";
import combineDuplicatedSelectors from "postcss-combine-duplicated-selectors";
import combineMediaQueries from "css-mqpacker";

import { rootNodeModules, src } from "./paths";
import { log, list } from "./utils";

export function compileScss(options: nodeSass.Options) {
  try {
    return nodeSass.renderSync({
      ...options,
      includePaths: [src, rootNodeModules],
    });
  } catch (e) {
    console.error(e.formatted);
    console.error();
    process.exit(1);
  }
}

export interface IPostCSSOptions {
  production: boolean;
  srcFile: string;
  outFile: string;
}

export async function postcss(
  css: string,
  { production, srcFile, outFile }: IPostCSSOptions
) {
  log("Running postcss with the following plugins:");
  log(
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
  log();

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

export function checkForInvalidCSS(css: string) {
  const matches = css.match(/.*rmd(-[a-z]+)+\(.*\n/);
  if (!matches) {
    return;
  }

  const matchContext = css.match(/(.*\n){0,3}.*rmd(-[a-z]+)+\(.*\n(.*\n){0,3}/);
  console.error(
    "There is invalid compiled css in this bundle. Please check the scss files"
  );
  console.error("to try to fix these issues.");
  console.error(list(matches.slice(0, matches.length - 1)));
  console.error();
  console.error(matchContext[0].trim());
  console.error();
  process.exit(1);
}

export function hackSCSSVariableValue(scssVariable: any, packageName: string) {
  const { name, value } = scssVariable.context;
  const prefix = `$${name}: `;

  try {
    const data = `@import 'src/${packageName}';
@error '${prefix}#{${value}}';
`;

    compileScss({
      data,
      outputStyle: "expanded",
    }).css.toString();
  } catch (error) {
    return {
      name,
      value: error.message.substring(prefix.length),
    };
  }
}
