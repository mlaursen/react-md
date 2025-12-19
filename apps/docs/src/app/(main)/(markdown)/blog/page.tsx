import { Avatar } from "@react-md/core/avatar/Avatar";
import { Box } from "@react-md/core/box/Box";
import { button } from "@react-md/core/button/styles";
import { cssUtils } from "@react-md/core/cssUtils";
import { list } from "@react-md/core/list/listStyles";
import { type TableOfContentsHeadingItem } from "@react-md/core/navigation/types";
import { Typography } from "@react-md/core/typography/Typography";
import ChevronRightIcon from "@react-md/material-icons/ChevronRightIcon";
import { type Metadata } from "next";
import Link from "next/link.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { type ReactElement } from "react";

import { LinkableHeading } from "@/components/LinkableHeading.js";
import { Markdown } from "@/components/Markdown.js";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents.js";

import { getBlogs } from "./data.js";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts for the react-md React component library",
  keywords: ["blog", "release notes"],
};

// TODO: See if there is another way to handle this. vercel does not keep the files
// so this fails without the run-time bundling. this does make it so this page is
// forced to use system theme and none of the user preferences.
export const dynamic = "force-static";

const DATE_FORMATTER = Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export default async function BlogPage(): Promise<ReactElement> {
  const cwd = dirname(fileURLToPath(import.meta.url));
  const blogs = await getBlogs(cwd);
  const toc = blogs.map<TableOfContentsHeadingItem>(({ id, title }) => ({
    id,
    children: title,
    depth: 1,
  }));

  return (
    <>
      <TableOfContents toc={toc} />
      <LinkableHeading
        id="the-latest-news-about-react-md"
        level={1}
        textAlign="center"
      >
        The latest news about react-md
      </LinkableHeading>
      <ol className={list()}>
        {blogs.map((blog) => {
          const { id, title, slug, author, date, exerpt } = blog;

          return (
            <li key={slug}>
              <LinkableHeading
                id={id}
                level={2}
                type="headline-4"
                margin="none"
              >
                {title}
              </LinkableHeading>
              <Markdown source={exerpt} />
              <Box fullWidth align="end" justify="space-between">
                <Box disablePadding>
                  <Avatar color="teal">{author.charAt(0)}</Avatar>
                  <Box align="start" stacked disableGap disablePadding>
                    <Typography margin="none">{author}</Typography>
                    <time
                      className={cssUtils({ textColor: "text-secondary" })}
                      dateTime={date.toISOString().replace(/T.+$/, "")}
                    >
                      {DATE_FORMATTER.format(date)}
                    </time>
                  </Box>
                </Box>
                <Link
                  href={`/blog/${slug}`}
                  className={button({
                    theme: "primary",
                    className: cssUtils({ textDecoration: "none" }),
                  })}
                >
                  Read More
                  <ChevronRightIcon />
                </Link>
              </Box>
            </li>
          );
        })}
      </ol>
    </>
  );
}
