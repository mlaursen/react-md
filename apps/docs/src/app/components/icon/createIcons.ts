/* eslint-disable no-console */
import lodash from "lodash";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { format } from "prettier";
import { optimize } from "svgo";

const SVGS_PATH = join("src", "svgs");
const ICONS_PATH = join("src", "icons");

const CLOSING_TAG_LENGTH = "</svg>".length;

async function run(): Promise<void> {
  await rm(ICONS_PATH, { recursive: true, force: true });
  await mkdir(ICONS_PATH);

  const svgs = await readdir(SVGS_PATH);
  await Promise.all(
    svgs.map(async (svgPath) => {
      const iconName = svgPath.replace(".svg", "");
      const componentName = lodash.upperFirst(
        lodash.camelCase(svgPath.replace(".svg", "Icon"))
      );
      const outputPath = join(ICONS_PATH, `${componentName}.tsx`);

      // get the raw svg contents and optimize it through svgo
      const rawSvgContents = await readFile(svgPath, "utf8");
      const optimized = optimize(rawSvgContents, {
        path: svgPath,
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeUselessStrokeAndFill: {
                  removeNone: true,
                },
              },
            },
          },
          "prefixIds",
          "removeDimensions",
        ],
      }).data;

      const contentsStart = optimized.indexOf(">") + 1;
      // extract the viewBox from the icon since it most likely won't display
      // correctly otherwise
      const [, viewBox] =
        optimized
          .substring(0, contentsStart)
          .match(/viewBox="((\d+\s?){4})"/) || [];
      if (!viewBox) {
        console.error(`Unable to find a viewbox for: ${svgPath}`);
        process.exit(1);
      }

      // remove the `<svg ...>` and `</svg>` from the optimized code to get the
      // contents to render in the `<SVGIcon>`
      const contents = optimized
        .substring(contentsStart, CLOSING_TAG_LENGTH)
        // convert _some_ inline styles for React
        .replace(
          /style="mix-blend-mode:([a-z]+)"/g,
          "style={{ mixBlendMode: '$1' }}"
        )
        // converts kebab-cased properties and colon:cased poverties to
        // camelCase for react
        .replace(
          /([a-z]+)[-:]([-:a-z]+)=/g,
          (_match, prefix, suffix) =>
            `${prefix}${lodash.upperFirst(lodash.camelCase(suffix))}`
        );

      const iconCode = `import { SVGIcon, type SVGIcon } from "@react-md/core";
import { forwardRef } from "react";

export const ${componentName} = forwardRef<SVGSVGElement, SVGIconProps>(function ${componentName}(props, ref) {
  return (
    <SVGIcon
      {...props}
      ref={ref}
      data-icon="${iconName}"
      viewBox="${viewBox}"
    >
      ${contents}
    </SVGIcon>
  );
})
`;
      const formattedIconCode = await format(iconCode, {
        parser: "typescript",
      });

      await writeFile(outputPath, formattedIconCode);
    })
  );
}

run();
