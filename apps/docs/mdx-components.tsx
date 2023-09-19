import Blockquote from "@/components/Blockquote/Blockquote.jsx";
import { Code } from "@/components/Code/Code.jsx";
import type { CodeBlockProps } from "@/components/Code/CodeBlock.jsx";
import { CodeBlock } from "@/components/Code/CodeBlock.jsx";
import type { PackageManagerCodeProps } from "@/components/Code/PackageManagerCode.jsx";
import { PackageManagerCode } from "@/components/Code/PackageManagerCode.jsx";
import { LinkableHeading } from "@/components/LinkableHeading/LinkableHeading.jsx";
import { Typography, link } from "@react-md/core";
import type { MDXComponents } from "mdx/types.js";
import Link from "next/link.js";
import type { ReactElement, ReactNode } from "react";

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
  pre(
    props: CodeBlockProps & { packageManager?: PackageManagerCodeProps }
  ): ReactElement;
}

type Components = Omit<MDXComponents, keyof RedefinedComponents> &
  RedefinedComponents;

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): Components {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    ...components,
    h1: (props) => <LinkableHeading {...props} level={2} />,
    h2: (props) => <LinkableHeading {...props} level={3} />,
    h3: (props) => <LinkableHeading {...props} level={4} />,
    h4: (props) => <LinkableHeading {...props} level={5} />,
    h5: (props) => <LinkableHeading {...props} level={6} />,
    h6: (props) => <LinkableHeading {...props} level={6} />,
    p: (props) => <Typography {...props} margin="bottom" />,
    a: (props) => <Link {...props} className={link()} />,
    blockquote: (props) => <Blockquote {...props} />,
    pre: (props) => {
      const { packageManager, ...remaining } = props;
      if (packageManager) {
        return <PackageManagerCode {...packageManager} />;
      }

      return <CodeBlock {...remaining} />;
    },
    code: (props) => {
      if (!props.className) {
        return <Code {...props} />;
      }

      // TODO
      return <code {...props} />;
    },
  };
}
