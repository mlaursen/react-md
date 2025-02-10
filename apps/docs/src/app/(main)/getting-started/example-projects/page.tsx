import { type TableOfContentsHeadings } from "@react-md/core/navigation/useTableOfContentsHeadings";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { MarkdownPage } from "@/components/MarkdownPage.jsx";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents.jsx";

const toc: Readonly<TableOfContentsHeadings> = [
  {
    id: "example-projects",
    depth: 1,
    children: "Example Projects",
  },
  {
    id: "templates",
    depth: 1,
    children: "Templates",
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
