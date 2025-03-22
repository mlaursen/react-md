import {
  type TableOfContentsHeading,
  type TableOfContentsHeadings,
} from "@react-md/core/navigation/types";
import { notFound } from "next/navigation.js";
import { type ReactElement } from "react";
import {
  type FormattedFunctionItem,
  type FormattedMixinItem,
  type FormattedSassDocItem,
  type FormattedVariableItem,
} from "sassdoc-generator/types";

import { TableOfContents } from "@/components/TableOfContents/TableOfContents.jsx";
import {
  SASSDOC_FUNCTIONS,
  SASSDOC_MIXINS,
  SASSDOC_VARIABLES,
} from "@/generated/sassdoc.js";
import { slug } from "@/utils/slug.js";

import { SassDocSection } from "./SassDocSection.jsx";
import { getGroupName } from "./utils.js";

interface SassDocGroup {
  mixins: Map<string, FormattedMixinItem>;
  functions: Map<string, FormattedFunctionItem>;
  variables: Map<string, FormattedVariableItem>;
}

const SASSDOC_GROUP = new Map<string, SassDocGroup>();

function getByGroupName(groupName: string): SassDocGroup {
  return (
    SASSDOC_GROUP.get(groupName) || {
      mixins: new Map(),
      functions: new Map(),
      variables: new Map(),
    }
  );
}
Object.values(SASSDOC_MIXINS).forEach((item) => {
  if (item.private) {
    return;
  }
  const groupName = getGroupName(item);
  const group = getByGroupName(groupName);
  group.mixins.set(item.name, item);
  SASSDOC_GROUP.set(groupName, group);
});
Object.values(SASSDOC_FUNCTIONS).forEach((item) => {
  if (item.private) {
    return;
  }
  const groupName = getGroupName(item);
  const group = getByGroupName(groupName);
  group.functions.set(item.name, item);
  SASSDOC_GROUP.set(groupName, group);
});
Object.values(SASSDOC_VARIABLES).forEach((item) => {
  if (item.private) {
    return;
  }
  const groupName = getGroupName(item);
  const group = getByGroupName(groupName);
  group.variables.set(item.name, item);
  SASSDOC_GROUP.set(groupName, group);
});

const SASSDOC_GROUP_NAMES = [...SASSDOC_GROUP.keys()];

function createTOC(
  lookup: ReadonlyMap<string, FormattedSassDocItem>,
  children: string
): TableOfContentsHeadings {
  const toc: TableOfContentsHeading[] = [];
  if (!lookup.size) {
    return toc;
  }

  const baseId = slug(children);
  toc.push({ id: baseId, depth: 1, children });
  lookup.forEach((item) => {
    const itemId = slug(`${baseId}-${item.name}`);
    toc.push({
      id: itemId,
      depth: 2,
      children: item.name,
    });
    if ("returns" in item && item.returns) {
      toc.push({
        id: `${itemId}-returns`,
        depth: 3,
        children: "Returns",
      });
    }

    if ("parameters" in item && item.parameters?.length) {
      toc.push({
        id: `${itemId}-parameters`,
        depth: 3,
        children: "Parameters",
      });
    }

    if ("throws" in item && item.throws?.length) {
      toc.push({
        id: `${itemId}-throws`,
        depth: 3,
        children: "Throws",
      });
    }

    if (item.examples?.length) {
      toc.push({
        id: `${itemId}-examples`,
        depth: 3,
        children: "Examples",
      });

      item.examples.forEach((example) => {
        if (!example.description) {
          return;
        }

        toc.push({
          id: slug(`${itemId}-example-${example.description}`),
          depth: 4,
          children: example.description,
        });
      });
    }
  });

  return toc;
}

export async function generateStaticParams(): Promise<{ group: string }[]> {
  return SASSDOC_GROUP_NAMES.map((group) => ({ group }));
}

export interface PageProps {
  params: { group: string };
  searchParams: Record<string, unknown>;
}

export default async function Page(props: PageProps): Promise<ReactElement> {
  const {
    params: { group },
  } = props;
  const lookup = SASSDOC_GROUP.get(group);
  if (!lookup) {
    notFound();
  }

  const toc = [
    ...createTOC(lookup.variables, "Variables"),
    ...createTOC(lookup.mixins, "Mixins"),
    ...createTOC(lookup.functions, "Functions"),
  ];

  return (
    <>
      <TableOfContents toc={toc} />
      <SassDocSection items={lookup.variables}>Variables</SassDocSection>
      <SassDocSection items={lookup.mixins}>Mixins</SassDocSection>
      <SassDocSection items={lookup.functions}>Functions</SassDocSection>
    </>
  );
}
