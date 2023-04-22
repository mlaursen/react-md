import { Divider, link, Typography } from "@react-md/core";
import { UnstyledLink } from "src/components/UnstyledLink";
import { LinkableHeading } from "src/components/LinkableHeading";
import { Blockquote } from "./Blockquote";
import { CodeBlock, InlineCode } from "./Code";

// for some reason this file lags terribly if it is typescript
/** @type {any} */
export const MDX_COMPONENTS = {
  a: (props) => <UnstyledLink href="" {...props} className={link({})} />,
  h1: (props) => <LinkableHeading {...props} level={1} />,
  h2: (props) => <LinkableHeading {...props} level={2} />,
  h3: (props) => <LinkableHeading {...props} level={3} />,
  h4: (props) => <LinkableHeading {...props} level={4} />,
  h5: (props) => <LinkableHeading {...props} level={5} />,
  h6: (props) => <LinkableHeading {...props} level={6} />,
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
