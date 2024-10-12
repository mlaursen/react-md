import { describe, expect, it } from "@jest/globals";
import { compile } from "@mdx-js/mdx";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import rehypeSlug from "rehype-slug";
import { rehypeToc, type TOCItem } from "../rehype-toc.js";

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
    const expected: TOCItem[] = [
      {
        id: "installation",
        value: "Installation",
        depth: 1,
        children: [
          {
            id: "installing-dependencies",
            value: "Installing Dependencies",
            depth: 2,
          },
          {
            id: "adding-base-styles",
            value: "Adding Base Styles",
            depth: 2,
          },
          {
            id: "adding-the-roboto-font",
            value: "Adding the Roboto Font",
            depth: 2,
          },
          {
            id: "adding-the-material-icons-font",
            value: "Adding the Material Icons Font",
            depth: 2,
          },
          {
            id: "react-md-should-now-be-fully-installed",
            value: "react-md should now be fully installed!",
            depth: 2,
            children: [
              {
                id: "where-do-i-go-from-here",
                value: "Where do I go from here?",
                depth: 3,
              },
            ],
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
    const expected: TOCItem[] = [
      {
        id: "heading-1",
        value: "Heading 1",
        depth: 1,
        children: [
          {
            id: "heading-3",
            value: "Heading 3",
            depth: 3,
          },
          {
            id: "heading-2",
            value: "Heading 2",
            depth: 2,
            children: [
              {
                id: "heading-6",
                value: "Heading 6",
                depth: 6,
              },
            ],
          },
          {
            id: "heading-2-again",
            value: "Heading 2 Again",
            depth: 2,
          },
        ],
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
