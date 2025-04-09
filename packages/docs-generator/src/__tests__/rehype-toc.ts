import { describe, expect, it } from "@jest/globals";
import { compile } from "@mdx-js/mdx";
import { type TableOfContentsHeadings } from "@react-md/core/navigation/types";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import rehypeSlug from "rehype-slug";

import { rehypeToc } from "../rehype-toc.js";

async function getFixture(name: string): Promise<string> {
  const filePath = resolve(process.cwd(), "src", "__testfixtures__", name);
  return await readFile(filePath, "utf8");
}

const processMarkdown = (markdown: string) =>
  compile(markdown, {
    rehypePlugins: [rehypeSlug, rehypeToc],
  });

describe("rehypeToc", () => {
  it("should create a table of contents correctly", async () => {
    const markdown = await getFixture("LargeMarkdown.mdx");
    const processed = await processMarkdown(markdown);
    const { toc } = processed.data;
    const expected: TableOfContentsHeadings = [
      {
        id: "installation",
        children: "Installation",
        depth: 1,
      },
      // I want all the headings to be flattended by 1 since I need to enforce
      // that the first heading is an H1 for SEO/searching.
      {
        id: "installing-dependencies",
        children: "Installing Dependencies",
        depth: 1,
      },
      {
        id: "adding-base-styles",
        children: "Adding Base Styles",
        depth: 1,
      },
      {
        id: "adding-the-roboto-font",
        children: "Adding the Roboto Font",
        depth: 1,
      },
      {
        id: "adding-the-material-icons-font",
        children: "Adding the Material Icons Font",
        depth: 1,
      },
      {
        id: "react-md-should-now-be-fully-installed",
        children: "react-md should now be fully installed!",
        depth: 1,
        items: [
          {
            id: "where-do-i-go-from-here",
            children: "Where do I go from here?",
            depth: 2,
          },
        ],
      },
    ];
    expect(toc).toEqual(expected);
  });

  it("should throw an error if the rehype-slug pluginw as not used before", async () => {
    const markdown = await getFixture("LargeMarkdown.mdx");
    await expect(
      compile(markdown, { rehypePlugins: [rehypeToc] })
    ).rejects.toEqual(
      new Error(
        "The rehype-slug plugin must be included before the rehype-toc plugin"
      )
    );
  });

  it("should handle randomly ordered headings", async () => {
    const markdown = await getFixture("RandomOrderHeadings.md");
    const processed = await processMarkdown(markdown);
    const { toc } = processed.data;
    const expected: TableOfContentsHeadings = [
      {
        id: "heading-1",
        children: "Heading 1",
        depth: 1,
        items: [
          {
            id: "heading-3",
            children: "Heading 3",
            depth: 2,
          },
        ],
      },
      {
        id: "heading-2",
        children: "Heading 2",
        depth: 1,
        items: [
          {
            id: "heading-6",
            children: "Heading 6",
            depth: 5,
          },
        ],
      },
      {
        id: "heading-2-again",
        children: "Heading 2 Again",
        depth: 1,
      },
    ];

    expect(toc).toEqual(expected);
  });

  it("should return an empty list if there are no headings in the markdown file", async () => {
    const markdown = await getFixture("CodeBlockOnly.md");
    const processed = await processMarkdown(markdown);

    expect(processed.data.toc).toEqual([]);
  });

  it("should do nothing if the file not meet the heading threshold", async () => {
    const markdown = await getFixture("CodeBlockOnly.md");
    const processed = await compile(markdown, {
      rehypePlugins: [rehypeSlug, [rehypeToc, { threshold: 1 }]],
    });
    expect(processed.data.toc).toBeUndefined();
  });
});
