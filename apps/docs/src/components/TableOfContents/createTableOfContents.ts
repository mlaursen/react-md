import GithubSlugger from "github-slugger";
import { readFile } from "node:fs/promises";
import { type TableOfContentsItem } from "./types.js";

export async function createTableOfContents(
  fileName: string,
  importUrl: string
): Promise<TableOfContentsItem[]> {
  const slugger = new GithubSlugger();
  const url = new URL(fileName, importUrl);
  const contents = await readFile(url, "utf8");
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
    children: [],
  };

  let previous = root;
  const parents: TableOfContentsItem[] = [];
  headings.forEach((heading) => {
    if (heading.depth > previous.depth) {
      if (!previous.children) {
        previous.children = [];
      }

      parents.push(previous);
    } else if (heading.depth < previous.depth) {
      while (parents[parents.length - 1].depth >= heading.depth) {
        parents.pop();
      }
    }

    const i = parents.length - 1;
    parents[i].children = [...(parents[i].children ?? []), heading];
    previous = heading;
  });

  return root.children ?? [];
}
