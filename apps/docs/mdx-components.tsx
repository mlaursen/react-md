import { Blockquote } from "@/components/Blockquote.jsx";
import {
  HighlightedCodeBlock,
  type HighlightedCodeBlockProps,
} from "@/components/HighlightedCodeBlock.jsx";
import { InlineColorPreview } from "@/components/InlineColorPreview.jsx";
import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { MarkdownLink } from "@/components/MarkdownLink.jsx";
import { getSluggedId } from "@/utils/getSluggedId.js";
import GithubSlugger from "github-slugger";
import { type MDXComponents } from "mdx/types.js";
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { Divider, Typography } from "react-md";

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
  code(props: HighlightedCodeBlockProps): Promise<ReactElement>;
  hr(props: Record<string, never>): ReactElement;
}

type Components = Omit<MDXComponents, keyof RedefinedComponents> &
  RedefinedComponents;

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): Components {
  const slugger = new GithubSlugger();
  return {
    // Allows customizing built-in components, e.g. to add styling.
    ...components,
    h1: (props) => (
      <LinkableHeading
        {...props}
        id={getSluggedId(slugger, props.children)}
        level={2}
      />
    ),
    h2: (props) => (
      <LinkableHeading
        {...props}
        id={getSluggedId(slugger, props.children)}
        level={3}
      />
    ),
    h3: (props) => (
      <LinkableHeading
        {...props}
        id={getSluggedId(slugger, props.children)}
        level={4}
      />
    ),
    h4: (props) => (
      <LinkableHeading
        {...props}
        id={getSluggedId(slugger, props.children)}
        level={5}
      />
    ),
    h5: (props) => (
      <LinkableHeading
        {...props}
        id={getSluggedId(slugger, props.children)}
        level={6}
      />
    ),
    h6: (props) => (
      <LinkableHeading
        {...props}
        id={getSluggedId(slugger, props.children)}
        level={6}
      />
    ),
    p: (props) => (
      <Typography {...props} margin="bottom">
        <InlineColorPreview>{props.children}</InlineColorPreview>
      </Typography>
    ),
    a: MarkdownLink,
    blockquote: (props) => <Blockquote {...props} />,
    ul: (props) => <Typography type="body-1" as="ul" {...props} />,
    ol: (props) => <Typography type="body-1" as="ol" {...props} />,
    pre: (props) => {
      if (!isValidElement<HighlightedCodeBlockProps>(props.children)) {
        throw new Error("Invalid pre element");
      }

      return cloneElement(props.children, { multiline: true });
    },
    code: HighlightedCodeBlock,
    hr: () => <Divider />,
  };
}
