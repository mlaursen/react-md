import { Typography } from "@react-md/core/typography/Typography";
import { type TOCItem } from "docs-generator/rehype-toc";
import { type ReactElement } from "react";

import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { MarkdownPage } from "@/components/MarkdownPage.jsx";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents.jsx";

const toc: readonly TOCItem[] = [
  {
    id: "example-projects",
    depth: 1,
    value: "Example Projects",
  },
  {
    id: "templates",
    depth: 1,
    value: "Templates",
  },
];

export default function ExampleProjectsPage(): ReactElement {
  return (
    <>
      <MarkdownPage>
        <LinkableHeading id="example-projects" level={2}>
          Example Projects
        </LinkableHeading>
        <Typography>
          Bootstrap a new project from one of these templates.
        </Typography>
        <LinkableHeading id="templates" level={2}>
          Templates
        </LinkableHeading>
      </MarkdownPage>
      <TableOfContents toc={toc} />
    </>
  );
}
