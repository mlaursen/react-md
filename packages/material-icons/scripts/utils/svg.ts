import lodash from "lodash";
import { optimize } from "svgo";

import { type MaterialComponentMetadata } from "./converters.js";

const END_SVG = "</svg>";

async function getSvgFromGoogleFontsApi(
  metadata: MaterialComponentMetadata
): Promise<string> {
  const { host, family, name, version } = metadata;
  const group = family.toLowerCase().replace(/ /g, "");
  const url = `https://${host}/s/i/${group}/${name}/v${version}/24px.svg`;
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  return await response.text();
}

const removeClassNames = (children: string): string =>
  children.replace(/class="[^"]+"/g, "");

function optimizeSvg(rawSvg: string): string {
  return optimize(removeClassNames(rawSvg), {
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
    ],
    multipass: true,
  }).data;
}

const fixStyle = (children: string): string =>
  children.replace(/style="([^"]+)"/g, (_match, styleString: string) => {
    const parts = styleString.split(";");

    const updated = parts.reduce((s, part) => {
      const [property, value] = part.split(":");

      return `${s}${s ? "," : ""}${lodash.camelCase(property)}: "${value}"`;
    }, "");

    return `style={{ ${updated} }}`;
  });

const camelCaseProps = (children: string): string =>
  children.replace(/(-|:)([a-z])/g, (_, __, letter: string) =>
    letter.toUpperCase()
  );

export async function getSvgIconChildren(
  metadata: MaterialComponentMetadata
): Promise<string> {
  const rawSvg = await getSvgFromGoogleFontsApi(metadata);
  const contents = optimizeSvg(rawSvg);

  // this is a bit hacky and I should look into a better way of doing this at
  // some point... since this is rendered in the `SVGIcon` component, want to
  // remove the `<svg (...attributes)>` and `</svg>` so that it only includes
  // the `<path>`, `<circle>`, or other children
  const startIndex = contents.indexOf(">") + 1;
  const endIndex = contents.length - END_SVG.length;

  return camelCaseProps(fixStyle(contents.substring(startIndex, endIndex)));
}
