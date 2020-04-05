import { existsSync, readFileSync } from "fs-extra";
import { upperFirst } from "lodash";
import log from "loglevel";
import { join } from "path";

import { documentationRoot, src } from "../constants";
import { toId, toTitle } from "../utils/titles";
import parseMarkdown from "./parseMarkdown";
import { DemoMetadata, TOCAnchor } from "./types";

interface MarkdownResult {
  anchors: readonly TOCAnchor[];
  summary: string;
  demos: readonly DemoMetadata[];
}

interface ReduceResult {
  anchors: TOCAnchor[];
  demos: DemoMetadata[];
}

export default function parseDemoIndex(demoRoute: string): MarkdownResult {
  const [, pkgName] = demoRoute.split("/").reverse();
  const demoFolder = join(
    documentationRoot,
    src,
    "components",
    "Demos",
    toTitle(pkgName, "")
  );
  const demoIndexPath = join(demoFolder, "index.tsx");

  const contents = readFileSync(demoIndexPath, "utf8");
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
        log.warn(`\`${title}\` demo does not have a valid summary!`);
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
