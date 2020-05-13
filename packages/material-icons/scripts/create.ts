import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import prettier from "prettier";

import { glob } from "./utils";
import { srcDir } from "./constants";

function toPascalCase(fileName: string): string {
  if (fileName.match(/^[0-9]/)) {
    const [first, second, ...remaining] = fileName.split("_");
    fileName = `${second}_${first}${
      remaining.length ? `_${remaining.join("_")}` : ""
    }`;
  }

  return _.upperFirst(_.camelCase(fileName));
}

function createIconFile(
  componentName: string,
  children: string,
  iconType: "SVG" | "Font"
): string {
  const element = iconType === "SVG" ? "SVGSVGElement" : "HTMLElement";
  return prettier.format(
    `// This is a generated file from running the "createIcons" script. This file should not be updated manually.
import React, { forwardRef } from "react";

import { ${iconType}Icon, ${iconType}IconProps } from "@react-md/icon";

export default forwardRef<${element}, ${iconType}IconProps>(function ${componentName}${iconType}Icon(props, ref) {
  return <${iconType}Icon {...props} ref={ref}>${children}</${iconType}Icon>;
});
`,
    { printWidth: 80, trailingComma: "es5", parser: "typescript" }
  );
}

// kind of hacky, but each icon starts and ends the same way right now..
const SVG_ICON_PREFIX =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">';
const SVG_ICON_SUFFIX = "</svg>";

async function parseSVGFileAndCreateComponents(
  svgFilePath: string,
  componentName: string,
  iconName: string,
  svgIconFile: string,
  fontIconFile: string
): Promise<void> {
  const svg = (
    await fs.readFile(path.join(process.cwd(), svgFilePath), "utf8")
  ).replace(' baseProfile="tiny"', "");

  const contents = svg
    .substring(SVG_ICON_PREFIX.length, svg.length - SVG_ICON_SUFFIX.length)
    .replace(/fill-opacity/g, "fillOpacity")
    // remove fill so the colors can be overridden in css
    .replace(/ ?fill="#[A-Fa-f0-9]{3,6}"/g, "");

  await Promise.all([
    fs.outputFile(svgIconFile, createIconFile(componentName, contents, "SVG")),
    fs.outputFile(
      fontIconFile,
      createIconFile(componentName, iconName, "Font")
    ),
  ]);
}

async function createIndexFile(components: string[]): Promise<void> {
  const contents = `// This is a generated file from running the "createIcons" script. This file should not be updated manually.
${components.reduce(
  (s, c) => `${s ? `${s}\n` : ""}export { default as ${c} } from "./${c}";`,
  ""
)}
`;

  return fs.outputFile(path.join(srcDir, "index.ts"), contents);
}

export default async function create(): Promise<void> {
  const svgFiles = await glob("svgs/*.svg");

  await fs.remove(srcDir);
  await fs.ensureDir(srcDir);

  const components: string[] = [];
  await Promise.all(
    svgFiles.map((svgFilePath) => {
      const iconName = svgFilePath.replace(/.+\//, "").replace(/\.svg$/, "");
      const componentName = toPascalCase(iconName);
      const svgIconName = `${componentName}SVGIcon`;
      const fontIconName = `${componentName}FontIcon`;
      const svgIconFile = path.join(srcDir, `${svgIconName}.tsx`);
      const fontIconFile = path.join(srcDir, `${fontIconName}.tsx`);
      components.push(svgIconName, fontIconName);

      return parseSVGFileAndCreateComponents(
        svgFilePath,
        componentName,
        iconName,
        svgIconFile,
        fontIconFile
      );
    })
  );

  console.log("Updating the main index file to include all the components...");
  await createIndexFile(components);
  console.log("Done.");
}
