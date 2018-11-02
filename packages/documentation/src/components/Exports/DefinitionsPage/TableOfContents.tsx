import * as React from "react";
import { Text, TextContainer } from "@react-md/typography";
import { List, ListItem } from "@react-md/list";
import { kebabCase, upperFirst } from "lodash";

import Link from "components/Link";
import { Markdown } from "components/Markdown";

import {
  DocumentedType,
  IDocumentedComponent,
  IDocumentedType,
  IDocumentedDefaultProps,
  IDocumentedInterface,
  InterfaceOrDefaultProps,
} from "../types.d";

export interface ITableOfContentsProps {
  interfaces: InterfaceOrDefaultProps[];
  types: IDocumentedType[];
}

function createLinks(list: DocumentedType[], title: string) {
  if (!list.length) {
    return "";
  }

  const links = list
    .map(({ type, name }) => `    + [${name}](#${type}-${kebabCase(name)})`)
    .join("\n");

  return `- [${title}](#${kebabCase(title)})
${links}
  `;
}

const TableOfContents: React.SFC<ITableOfContentsProps> = ({ interfaces, types }) => {
  const markdown = `## Table of Contents
${[createLinks(interfaces, "Interfaces"), createLinks(types, "Types")].filter(Boolean).join("\n")}`;

  return <Markdown markdown={markdown} />;
};

export default TableOfContents;
