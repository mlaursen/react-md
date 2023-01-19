import type { MDXProvider } from "@mdx-js/react";
import { Divider, link, Typography } from "@react-md/core";
import type {
  ComponentProps,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { UnstyledLink } from "src/components/UnstyledLink";
import { Blockquote } from "./Blockquote";
import { CodeBlock, InlineCode } from "./Code";
type IntrinsicElements = {
  [Key in keyof JSX.IntrinsicElements]?: ElementType<
    Omit<JSX.IntrinsicElements[Key], "ref">
  >;
};

interface PluginOverrideElements {
  pre: ElementType<
    HTMLAttributes<HTMLSpanElement> & {
      lines?: string;
    }
  >;

  // only enable for markdown pages only
  wrapper?: ElementType<{ children: ReactNode }>;
}

type MDXComponents = Omit<IntrinsicElements, keyof PluginOverrideElements> &
  PluginOverrideElements;

const components: MDXComponents = {
  a: (props) => <UnstyledLink href="" {...props} className={link({})} />,
  h1: (props) => <Typography {...props} type="headline-1" />,
  h2: (props) => <Typography {...props} type="headline-2" />,
  h3: (props) => <Typography {...props} type="headline-3" />,
  h4: (props) => <Typography {...props} type="headline-4" />,
  h5: (props) => <Typography {...props} type="headline-5" />,
  h6: (props) => <Typography {...props} type="headline-6" />,
  p: Typography,
  hr: Divider,
  pre: (props) => {
    const { lines, children = "" } = props;
    return (
      <CodeBlock
        {...props}
        lines={typeof lines === "string" ? parseInt(lines, 10) : undefined}
      >
        {children}
      </CodeBlock>
    );
  },
  code: (props) => {
    if (props.className) {
      return <code {...props} />;
    }

    return <InlineCode {...props} />;
  },
  blockquote: Blockquote,

  li: (props) => <Typography {...props} as="li" type="subtitle-1" />,

  // only enable for markdown pages
  // wrapper: TextContainer,
};

// have to typecast because of the weird legacy ref behavior and the additional
// properties that get added with my custom mdx plugins
export const MDX_COMPONENTS = components as ComponentProps<
  typeof MDXProvider
>["components"];
