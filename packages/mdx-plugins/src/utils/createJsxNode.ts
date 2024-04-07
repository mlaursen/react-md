import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { type MdxJsxFlowElementHast } from "mdast-util-mdx-jsx";
import { mdxjs } from "micromark-extension-mdxjs";

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

  return fromMarkdown(`<${as} ${jsxProps} />`, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  }).children[0] as MdxJsxFlowElementHast;
}
