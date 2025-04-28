import rawlist from "@inquirer/rawlist";
import search from "@inquirer/search";

import { caseInsensitiveSearch } from "./search.js";
import { alphaNumericSort } from "./sort.js";

interface Options {
  transform?: string;
  transformNames: ReadonlyMap<string, string>;
  versionedTransforms: ReadonlyMap<string, ReadonlySet<string>>;
}

export async function getTransformName(options: Options): Promise<string> {
  const { transform, transformNames, versionedTransforms } = options;
  if (transform && transformNames.has(transform)) {
    return transform;
  }

  const version = await rawlist<string>({
    message: "Which version of react-md would you like to upgrade",
    choices: alphaNumericSort([...versionedTransforms.keys()], {
      descending: true,
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const versionTransforms = versionedTransforms.get(version)!;
  const grouped = new Map<string, Set<string>>();
  versionTransforms.forEach((transformName) => {
    const [group, ...remaining] = transformName.split("/");
    if (remaining.length) {
      const transforms = grouped.get(group) || new Set<string>();
      transforms.add(remaining.join("/"));
      grouped.set(group, transforms);
    }
  });
  if (!grouped.size) {
    const list = [...versionTransforms];
    const transform = await search({
      message: `Which transform from "${version}"?`,
      source: (search = "") => caseInsensitiveSearch({ list, search }),
    });

    return `${version}/${transform}`;
  }

  const groups = [...grouped.keys()];
  groups.sort((a, b) => {
    if (a === "prerequisites") {
      return -1;
    }

    if (b === "prerequisites") {
      return 1;
    }

    if (a === "post-optimizations") {
      return -1;
    }
    if (b === "post-optimizations") {
      return 1;
    }

    return 0;
  });
  const group = await search<string>({
    message: `Which group of transforms from ${version}?`,
    source: (search = "") => caseInsensitiveSearch({ list: groups, search }),
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const groupTransforms = [...grouped.get(group)!];
  const prefix = `${version}/${group}`;
  const finalTransform = await search({
    message: `Which transform from "${prefix}"`,
    source: (search = "") =>
      caseInsensitiveSearch({ list: groupTransforms, search }),
  });

  return `${prefix}/${finalTransform}`;
}
