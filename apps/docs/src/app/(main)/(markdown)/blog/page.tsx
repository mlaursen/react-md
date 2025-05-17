import { Avatar } from "@react-md/core/avatar/Avatar";
import { Box } from "@react-md/core/box/Box";
import { button } from "@react-md/core/button/styles";
import { cssUtils } from "@react-md/core/cssUtils";
import { list } from "@react-md/core/list/listStyles";
import { type TableOfContentsHeadingItem } from "@react-md/core/navigation/types";
import { Typography } from "@react-md/core/typography/Typography";
import ChevronRightIcon from "@react-md/material-icons/ChevronRightIcon";
import { assertString } from "docs-generator/utils/assertions";
import { glob } from "glob";
import matter from "gray-matter";
import { type Metadata } from "next";
import Link from "next/link.js";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type ReactElement } from "react";

import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { Markdown } from "@/components/Markdown.jsx";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents.jsx";
import { slug } from "@/utils/slug.js";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts for the react-md React component library",
  keywords: ["blog", "release notes"],
};

export const dynamic = "force-static";

function assertDate(value: unknown): asserts value is Date {
  if (!(value instanceof Date)) {
    throw new Error("Date is missing");
  }
}

interface Blog {
  id: string;
  title: string;
  date: Date;
  slug: string;
  author: string;
  experpt: string;
}

async function getBlogs(): Promise<readonly Blog[]> {
  const blogs: Blog[] = [];
  const cwd = dirname(fileURLToPath(import.meta.url));
  const pages = await glob("**/page.mdx", { cwd });
  await Promise.all(
    pages.map(async (page) => {
      const contents = await readFile(join(cwd, page), "utf8");
      const { data } = matter(contents);

      const pageSlug = page.substring(0, page.lastIndexOf("/"));
      const { title, author, date, description, experpt = description } = data;
      assertString(title);
      assertString(experpt);
      assertString(author);
      assertDate(date);

      blogs.push({
        id: slug(title),
        title,
        date,
        slug: pageSlug,
        author,
        experpt,
      });
    })
  );

  blogs.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });

  return blogs;
}

const DATE_FORMATTER = Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export default async function BlogPage(): Promise<ReactElement> {
  const blogs = await getBlogs();
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
          const { id, title, slug, author, date, experpt } = blog;

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
              <Typography>
                <Markdown source={experpt} />
              </Typography>
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
