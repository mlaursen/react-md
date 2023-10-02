import GithubSlugger from "github-slugger";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { type TableOfContentsItem } from "../../src/components/TableOfContents/types.js";
import { format } from "../../src/utils/format.js";
import { GENERATED_FILE_BANNER } from "../constants.js";

export async function createTableOfContents(
  markdownPath: string
): Promise<void> {
  const slugger = new GithubSlugger();
  const contents = await readFile(markdownPath, "utf8");
  const headings = (
    contents.match(/^#{1,6}\s.+$/gm) || []
  ).map<TableOfContentsItem>((heading) => {
    const [, levels, label] = heading.match(/^(#{1,6}) (.+)$/) || [];
    const id = slugger.slug(label);

    return {
      id,
      depth: levels.length,
      value: label,
    };
  });

  const root: TableOfContentsItem = {
    id: "",
    depth: 0,
    value: "",
    items: [],
  };

  let previous = root;
  const parents: TableOfContentsItem[] = [];
  headings.forEach((heading) => {
    if (heading.depth > previous.depth) {
      if (!previous.items) {
        previous.items = [];
      }

      parents.push(previous);
    } else if (heading.depth < previous.depth) {
      while (parents[parents.length - 1].depth >= heading.depth) {
        parents.pop();
      }
    }

    const i = parents.length - 1;
    parents[i].items = [...(parents[i].items ?? []), heading];
    previous = heading;
  });

  const tocPath = join(dirname(markdownPath), "toc.ts");
  const formattedTocContents = await format(
    `${GENERATED_FILE_BANNER}
import { type TableOfContentsItem } from "@/components/TableOfContents/types.js";

export const toc = ${JSON.stringify(
      root.items ?? []
    )} satisfies readonly TableOfContentsItem[]`
  );
  await writeFile(tocPath, formattedTocContents);
}
