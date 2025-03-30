import { Box } from "@react-md/core/box/Box";
import { dialog } from "@react-md/core/dialog/styles";
import { Portal } from "@react-md/core/portal/Portal";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { notFound } from "next/navigation.js";
import { type ReactElement } from "react";

import { Markdown } from "@/components/Markdown.jsx";
import { PageNotFound } from "@/components/PageNotFound/PageNotFound.jsx";
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
      {process.env.NODE_ENV !== "production" && (
        <Portal>
          <Box
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 999,
              paddingBottom: 0,
            }}
          >
            <TextContainer
              style={{ paddingBlock: 0 }}
              className={dialog({ fixed: true, type: "centered" })}
            >
              <Markdown
                source={`> !Info! If the sassdoc does not match the \`@react-md/core\` source code, run the following command:

\`\`\`sh
pnpm --filter docs sassdoc
\`\`\`
`}
              />
            </TextContainer>
          </Box>
        </Portal>
      )}
    </>
  );
}
