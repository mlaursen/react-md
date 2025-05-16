import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import cssnanoPresetDefault from "cssnano-preset-default";
import postcss from "postcss";

import { type CompileScssOptions, compileScss } from "./compileScssModule.js";

export async function compileAndMinifyScss(
  options: CompileScssOptions
): Promise<string> {
  const compiled = compileScss(options);
  const result = await postcss([
    cssnano({
      preset: cssnanoPresetDefault({
        env: "production",
      }),
      plugins: [autoprefixer],
    }),
  ]).process(compiled, {
    from: "./theme.css",
  });

  return result.css;
}
