import * as React from "react";
import { sortBy } from "lodash";
import { Text, TextContainer } from "@react-md/typography";

import { Markdown } from "components/Markdown";
import { DocumentationPage, Banner } from "components/DocumentationPage";

import {
  IDocumentedFile,
  DocumentedType,
  IDocumentedType,
  InterfaceOrDefaultProps,
} from "../types.d";

import "./definitions-page.scss";
import TableOfContents from "./TableOfContents";
import Interfaces from "./Interfaces";

export interface IDefinitionsPageProps {
  packageDefinition: IDocumentedFile;
}

function filterAndSort(typeFilter: string | RegExp, types: DocumentedType[]) {
  return sortBy(types.filter(({ type }) => type.match(typeFilter)), ({ name }) => name);
}

export default class DefinitionsPage extends React.Component<IDefinitionsPageProps> {
  constructor(props: IDefinitionsPageProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const { packageDefinition } = this.props;
    const everything = Object.keys(packageDefinition).map(key => packageDefinition[key]);
    const interfaces = filterAndSort(/interface|default/, everything) as InterfaceOrDefaultProps[];
    const types = filterAndSort("type", everything) as IDocumentedType[];

    return (
      <DocumentationPage>
        <Banner>Typography</Banner>
        <Text type="headline-2">Typography</Text>
        <TableOfContents interfaces={interfaces} types={types} />
        <Interfaces interfaces={interfaces} />
      </DocumentationPage>
    );
  }
}
