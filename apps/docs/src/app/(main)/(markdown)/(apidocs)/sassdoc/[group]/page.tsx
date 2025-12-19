import { type TableOfContentsHeadings } from "@react-md/core/navigation/types";
import { type Metadata } from "next";
import { notFound } from "next/navigation.js";
import { type ReactElement } from "react";

import { LinkableHeading } from "@/components/LinkableHeading.js";
import { Markdown } from "@/components/Markdown.js";
import { PageNotFound } from "@/components/PageNotFound/PageNotFound.js";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents.js";
import {
  SASSDOC_GROUP,
  SASSDOC_GROUP_NAMES,
} from "@/constants/sassdocGroups.js";
import { createTOC } from "@/utils/sassdoc.js";
import { slug } from "@/utils/slug.js";
import { titleCase } from "@/utils/strings.js";

import { DevRegenDialog } from "./DevRegenDialog.js";
import { SassDocSection } from "./SassDocSection.js";

export interface PageProps {
  params: Promise<{ group: string }>;
  searchParams: Promise<Record<string, unknown>>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { group } = await props.params;
  const lookup = SASSDOC_GROUP.get(group);
  if (!lookup) {
    return {};
  }

  const groupTitle = titleCase(group, "-");
  const title = `${groupTitle} - Sass API Docs - react-md`;
  const description = `Provides the Sass documentation for the ${groupTitle} group of items.`;
  const keywords = ["sass", "sassdoc"];
  if (lookup.variables.size > 0) {
    keywords.push("variables");
  }
  if (lookup.functions.size > 0) {
    keywords.push("functions");
  }
  if (lookup.mixins.size > 0) {
    keywords.push("mixins");
  }

  return {
    title,
    keywords,
    description,
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    openGraph: {
      type: "website",
      title,
      description,
    },
  };
}

export async function generateStaticParams(): Promise<{ group: string }[]> {
  return SASSDOC_GROUP_NAMES.map((group) => ({ group }));
}

export default async function Page(props: PageProps): Promise<ReactElement> {
  const { group } = await props.params;
  const lookup = SASSDOC_GROUP.get(group);
  if (!lookup) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <>
          <PageNotFound />
          <Markdown
            source={`> !Info! If this page should exist, re-generate the sassdoc with the following command:

\`\`\`sh
pnpm --filter docs sassdoc
\`\`\`
`}
          />
        </>
      );
    }

    notFound();
  }

  const groupTitle = titleCase(group, "-") + " Sass API";
  const toc: TableOfContentsHeadings = [
    { id: slug(group), children: groupTitle, depth: 1 },
    ...createTOC(lookup.variables, "Variables"),
    ...createTOC(lookup.mixins, "Mixins"),
    ...createTOC(lookup.functions, "Functions"),
  ];

  return (
    <>
      <TableOfContents toc={toc} />
      <LinkableHeading id={slug(group)} level={1}>
        {groupTitle}
      </LinkableHeading>
      <SassDocSection items={lookup.variables}>Variables</SassDocSection>
      <SassDocSection items={lookup.mixins}>Mixins</SassDocSection>
      <SassDocSection items={lookup.functions}>Functions</SassDocSection>
      {process.env.NODE_ENV !== "production" && (
        <DevRegenDialog>
          <Markdown
            source={`> !Info! If the sassdoc does not match the \`@react-md/core\` source code, run the following command:

\`\`\`sh
pnpm --filter docs sassdoc
\`\`\`
`}
          />
        </DevRegenDialog>
      )}
    </>
  );
}
