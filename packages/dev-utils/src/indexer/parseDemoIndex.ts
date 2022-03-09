import { existsSync, readFileSync } from "fs-extra";
import { upperFirst } from "lodash";
import log from "loglevel";
import { join } from "path";

import { documentationRoot, src } from "../constants";
import { toId, toTitle } from "../utils";
import { parseMarkdown } from "./parseMarkdown";
import type { DemoMetadata, TOCAnchor } from "./types";

interface MarkdownResult {
  anchors: readonly TOCAnchor[];
  summary: string;
  demos: readonly DemoMetadata[];
}

interface ReduceResult {
  anchors: TOCAnchor[];
  demos: DemoMetadata[];
}

export function parseDemoRenderer(demoRoute: string): MarkdownResult {
  const [fileName, pkgName] = demoRoute.split("/").reverse();
  let demoFolder = join(
    documentationRoot,
    src,
    "components",
    "Demos",
    toTitle(pkgName, "")
  );

  let demoRendererPath = join(demoFolder, "index.tsx");
  if (fileName.endsWith("-demos")) {
    // I really need to redo this...
    const partName = toTitle(
      fileName.replace("-demos", fileName.startsWith("validation") ? "" : "s"),
      ""
    );
    demoFolder = join(demoFolder, partName);
    demoRendererPath = join(demoFolder, `${partName}.tsx`);
  }

  const contents = readFileSync(demoRendererPath, "utf8");
  const lines = contents.split(/\r?\n/);

  const { anchors, demos } = lines.reduce<ReduceResult>(
    (result, line) => {
      if (!/name: "/.test(line)) {
        return result;
      }

      const title = line.replace(/^.+"([A-z0-9- ]+)",/, "$1");
      let fileName = title
        .split(" ")
        .map(upperFirst)
        .join("")
        .replace(/\s|-/g, "");

      if (!existsSync(join(demoFolder, `${fileName}.md`))) {
        fileName = join(fileName, "README");
        if (!existsSync(join(demoFolder, `${fileName}.md`))) {
          throw new Error(
            `Unable to find a README file for the \`${title}\` demo`
          );
        }
      }

      const markdown = readFileSync(join(demoFolder, `${fileName}.md`), "utf8");
      const { summary } = parseMarkdown(markdown);
      if (!summary) {
        const name = toTitle(pkgName, " ");
        log.warn(`${name}'s \`${title}\` demo does not have a valid summary!`);
      }

      result.anchors.push({ anchor: `#${toId(title)}`, title });
      result.demos.push({ title, summary });

      return result;
    },
    { anchors: [], demos: [] }
  );

  return {
    summary: `Demos using the @react-md/${pkgName}'s exported components, hooks, and utils.`,
    anchors,
    demos,
  };
}
