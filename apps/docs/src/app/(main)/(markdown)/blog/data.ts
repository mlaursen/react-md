import { assertString } from "docs-generator/utils/assertions";
import { glob } from "glob";
import matter from "gray-matter";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { assertBoolean, assertDate } from "@/utils/assertions.js";
import { slug } from "@/utils/slug.js";

export interface Blog {
  id: string;
  title: string;
  date: Date;
  slug: string;
  author: string;
  exerpt: string;
  pinned: boolean;
}

export async function getBlogs(cwd: string): Promise<readonly Blog[]> {
  const blogs: Blog[] = [];
  const pages = await glob("**/page.mdx", { cwd });
  await Promise.all(
    pages.map(async (page) => {
      const contents = await readFile(join(cwd, page), "utf8");
      const { data } = matter(contents);

      const pageSlug = page.slice(0, Math.max(0, page.lastIndexOf("/")));
      const {
        title,
        author,
        date,
        description,
        exerpt = description,
        pinned,
      } = data;
      assertString(title, "title must be a string");
      assertString(exerpt, "exerpt must be a string");
      assertString(author, "author must be a string");
      assertDate(date, "date");
      if (pinned !== undefined) {
        assertBoolean(pinned, "pinned");
      }

      blogs.push({
        id: slug(title),
        title,
        date,
        slug: pageSlug,
        author,
        exerpt,
        pinned: !!pinned,
      });
    })
  );

  blogs.sort((a, b) => b.date.getTime() - a.date.getTime());

  return blogs;
}
