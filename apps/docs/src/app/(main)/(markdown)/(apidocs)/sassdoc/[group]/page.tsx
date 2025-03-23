import { notFound } from "next/navigation.js";
import { type ReactElement } from "react";

import { TableOfContents } from "@/components/TableOfContents/TableOfContents.jsx";

import { SassDocSection } from "./SassDocSection.jsx";
import { SASSDOC_GROUP, SASSDOC_GROUP_NAMES } from "./constants.js";
import { createTOC } from "./utils.js";

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
