import * as React from "react";
import { Text, TextContainer } from "@react-md/typography";
import { uniq } from "lodash";

import { Markdown } from "components/Markdown";
import { DocumentationPage, Banner } from "components/DocumentationPage";
import { IDocumentedFile, IDocumentedComponent } from "components/Exports/types.d";

import "./text.scss";
import { textFile } from "./dummyData";
import Props from "./Props";

export interface ITextProps {
  file?: IDocumentedFile;
}

export interface ITextDefaultProps {
  file: IDocumentedFile;
}

export type TextWithDefaultProps = ITextProps & ITextDefaultProps;

export default class TextDocumentation extends React.Component<ITextProps> {
  public static defaultProps: ITextDefaultProps = {
    file: textFile,
  };

  public render() {
    const { file } = this.props as TextWithDefaultProps;
    const exports = Object.keys(file).map(key => file[key]);
    const component = exports.find(({ type }) => type === "component") as IDocumentedComponent;
    const { name, description, source, sourceLine } = component;
    return (
      <DocumentationPage>
        <Banner source={source} sourceLine={sourceLine}>
          {name}
        </Banner>
        <Markdown markdown={description} className="elevated" />
        <Props component={component} file={file} />
      </DocumentationPage>
    );
  }
}
