import { Blockquote } from "@/components/Blockquote.jsx";
import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import {
  MarkdownCode,
  type MarkdownCodeProps,
} from "@/components/MarkdownCode.jsx";
import { MarkdownLink } from "@/components/MarkdownLink.jsx";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents.jsx";
import { TypescriptCodeBlock } from "@/components/TypescriptCodeBlock.jsx";
import { Divider } from "@react-md/core/divider/Divider";
import { Typography } from "@react-md/core/typography/Typography";
import { type MDXComponents } from "mdx/types.js";
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

interface HeadingProps {
  id: string;
  children: ReactNode;
}

interface RedefinedComponents {
  h1(props: HeadingProps): ReactElement;
  h2(props: HeadingProps): ReactElement;
  h3(props: HeadingProps): ReactElement;
  h4(props: HeadingProps): ReactElement;
  h5(props: HeadingProps): ReactElement;
  h6(props: HeadingProps): ReactElement;
  hr(props: Record<string, never>): ReactElement;
  TableOfContents: typeof TableOfContents;
  TypescriptCodeBlock: typeof TypescriptCodeBlock;
}

type Components = Omit<MDXComponents, keyof RedefinedComponents> &
  RedefinedComponents;

export function useMDXComponents(components: MDXComponents): Components {
  return {
    ...components,
    h1: (props) => <LinkableHeading {...props} level={2} />,
    h2: (props) => <LinkableHeading {...props} level={3} />,
    h3: (props) => <LinkableHeading {...props} level={4} />,
    h4: (props) => <LinkableHeading {...props} level={5} />,
    h5: (props) => <LinkableHeading {...props} level={6} />,
    h6: (props) => <LinkableHeading {...props} level={6} />,
    p: (props) => <Typography {...props} margin="bottom" />,
    a: MarkdownLink,
    hr: () => <Divider />,
    ul: (props) => <Typography type="body-1" as="ul" {...props} />,
    ol: (props) => <Typography type="body-1" as="ol" {...props} />,
    blockquote: (props) => <Blockquote {...props} />,
    pre: (props) => {
      const { children, ...codeProps } = props;
      if (!isValidElement<MarkdownCodeProps>(children)) {
        throw new Error("Invalid pre element");
      }

      return cloneElement(children, codeProps);
    },
    code: MarkdownCode,
    TableOfContents,
    TypescriptCodeBlock,
  };
}
