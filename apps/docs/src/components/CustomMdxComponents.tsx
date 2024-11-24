import { Blockquote } from "@/components/Blockquote.jsx";
import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import {
  MarkdownCode,
  type MarkdownCodeProps,
} from "@/components/MarkdownCode.jsx";
import { MarkdownLink } from "@/components/MarkdownLink.jsx";
import { PackageManagerCodeBlock } from "@/components/PackageManagerCodeBlock.jsx";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents.jsx";
import { TypescriptCodeBlock } from "@/components/TypescriptCodeBlock.jsx";
import { Divider } from "@react-md/core/divider/Divider";
import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableFooter } from "@react-md/core/table/TableFooter";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { Typography } from "@react-md/core/typography/Typography";
import { type MDXComponents } from "mdx/types.js";
import {
  cloneElement,
  isValidElement,
  type ComponentType,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./CustomMdxComponents.module.scss";

interface HeadingProps {
  id: string;
  children: ReactNode;
}

type RenderChildrenComponent = ComponentType<{ children: ReactNode }>;

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
  PackageManagerCodeBlock: typeof PackageManagerCodeBlock;
  table: RenderChildrenComponent;
  tr: RenderChildrenComponent;
  td: RenderChildrenComponent;
  th: RenderChildrenComponent;
}

export type CustomMDXComponents = Omit<
  MDXComponents,
  keyof RedefinedComponents
> &
  RedefinedComponents;

export const CUSTOM_MDX_COMPONENTS: CustomMDXComponents = {
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
  pre: (props: HTMLAttributes<HTMLPreElement>) => {
    const { children, ...codeProps } = props;
    if (!isValidElement<MarkdownCodeProps>(children)) {
      throw new Error("Invalid pre element");
    }

    return cloneElement(children, codeProps);
  },
  code: MarkdownCode,
  TableOfContents,
  TypescriptCodeBlock,
  PackageManagerCodeBlock,

  // switch to the commented out code below if server-side only context
  // is implemented by React
  table: (props) => (
    <TableContainer className={styles.table}>
      <Table {...props} />
    </TableContainer>
  ),
  thead: TableHeader,
  tbody: TableBody,
  tfoot: TableFooter,
  tr: TableRow,
  td: TableCell,
  th: TableCell,
  // table: ({ children }) => (
  //   <div className={tableContainer()}>
  //     <table className={table({ fullWidth: true })}>{children}</table>
  //   </div>
  // ),
  // tr: ({ children }) => (
  //   <tr className={tableRow({ disableHover: true })}>{children}</tr>
  // ),
  // td: ({ children }) => <td className={tableCell()}>{children}</td>,
  // th: ({ children }) => (
  //   <th
  //     className={tableCell({
  //       header: true,
  //       hAlign: "left",
  //     })}
  //   >
  //     {children}
  //   </th>
  // ),
  // thead: ({ children }) => {
  //   return <thead className={tableHeader()}>{children}</thead>;
  // },
};
