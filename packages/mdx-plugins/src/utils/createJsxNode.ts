import { type ElementContent } from "hast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { type MdxJsxFlowElementHast } from "mdast-util-mdx-jsx";
import { mdxjs } from "micromark-extension-mdxjs";

export function createJsxElementContent<
  T extends ElementContent = ElementContent,
>(code: string): T[] {
  return fromMarkdown(code, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  }).children as T[];
}

export interface CreateJsxNodeOptions {
  as: string;
  meta?: string;
  props?: Record<string, unknown>;
}

export function createJsxNode(
  options: CreateJsxNodeOptions
): MdxJsxFlowElementHast {
  const { as, meta, props } = options;

  let jsxProps = "";
  if (meta) {
    jsxProps = meta;
  }
  if (props) {
    const spread: string[] = [];
    Object.entries(props).forEach(([prop, value]) => {
      spread.push(`${prop}={${JSON.stringify(value)}}`);
    });

    jsxProps += spread.join(" ");
  }

  return createJsxElementContent<MdxJsxFlowElementHast>(
    `<${as} ${jsxProps} />`
  )[0];
}
