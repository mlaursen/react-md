import * as React from "react";
import cn from "classnames";
import { Text } from "@react-md/typography";

import {
  IDocumentedInterfaceAttribute,
  IDocumentedFile,
  ITypeParameter,
} from "components/Exports/types.d";
import { Markdown } from "components/Markdown";

type TablePart = React.SFC<{ className?: string; children: React.ReactNode }>;

const Header: TablePart = ({ children }) => (
  <th className="prop-table__cell prop-table__cell--header">{children}</th>
);

const Cell: TablePart = ({ children, className }) => (
  <td className={cn("prop-table__cell", className)}>{children}</td>
);

const Row: TablePart = ({ children, className }) => (
  <tr className={cn("prop-table__row", className)}>{children}</tr>
);

interface IHTMLAttribute {
  name: string;
  attributes: IHTMLAttributeAttribute[];
}

interface IHTMLAttributeAttribute {
  name: string;
  comment: string;
  value: string;
}

interface IHTMLAttributeLookup {
  [key: string]: IHTMLAttribute;
}

const DB = require("./libraryTypedoc.json");

export interface IPropTableProps {
  attributes: IDocumentedInterfaceAttribute[];
  file: IDocumentedFile;
  references: string[];
  typeParameters: ITypeParameter[];
}

export interface IPropTableState {
  recommendedExternal: boolean;
  allExternal: boolean;
}

function getRecommendedExternalProps(references: string[]): IDocumentedInterfaceAttribute[] {
  if (references.find(ref => /HTMLDivElement/.test(ref))) {
    const keys = ["style", "class", "onClick"];
    const attributes = (DB.HTMLAttributes.attributes as IDocumentedInterfaceAttribute[]).filter(
      ({ name }) => keys.includes(name)
    );
    console.log("attributes:", attributes);
    return attributes;
  }
  return [];
}

function getTypeReferenceValue(typeReference: string, file: IDocumentedFile) {
  if (typeReference.startsWith("React")) {
    return typeReference;
  }

  const type = DB[typeReference] || file[typeReference];
  if (!type || type.type !== "type") {
    console.log("type:", type);
    return typeReference;
  } else if (/^(union|function reflection)$/.test(type.tsType)) {
    return type.value;
  }
  console.log("IUNN");
  console.log("type:", type);

  return typeReference;
}

function getPrettyType(
  attribute: IDocumentedInterfaceAttribute,
  file: IDocumentedFile
): { children: React.ReactNode; multiline: boolean } {
  return attribute.typeReferences.reduce(
    (returnValue, ref) => {
      const value = getTypeReferenceValue(ref, file);
      if (/\r?\n/.test(value)) {
        returnValue.multiline = true;
      }
      returnValue.children = returnValue.children.replace(ref, value);
      return returnValue;
    },
    { children: attribute.type, multiline: false }
  );
}

export default class PropTable extends React.Component<IPropTableProps, IPropTableState> {
  constructor(props: IPropTableProps) {
    super(props);

    this.state = { recommendedExternal: true, allExternal: false };
  }

  public render() {
    const { attributes, file, typeParameters, references } = this.props;
    const thing = file[references[0]];
    let recommendedExternals: React.ReactNode = null;
    if (thing && thing.typeReferences.find(n => n === "HTMLAttributes")) {
      recommendedExternals = getRecommendedExternalProps(
        thing.typeReferences.filter(name => name !== "HTMLAttributes")
      ).map(attribute => {
        console.log("attribute:", attribute);
        return null;
        // const { name, required, defaultValue, description } = attribute;
        // const type = getPrettyType(attribute, file);
        // return (
        //   <Row key={name}>
        //     <Cell>
        //       {`${name}${required ? ` *` : ""}`}
        //       <Text>External</Text>
        //     </Cell>
        //     <Cell>
        //       <code
        //         className={cn("prop-table__code", {
        //           "prop-table__code--multiline": type.multiline,
        //         })}
        //       >
        //         {type.children}
        //       </code>
        //     </Cell>
        //     <Cell>{defaultValue && <code className="prop-table__code">{defaultValue}</code>}</Cell>
        //     <Cell className="prop-table__description">
        //       <Markdown markdown={description} />
        //     </Cell>
        //   </Row>
        // );
      });
    }
    // console.log("thing:", thing);
    // console.log("DB:", DB);
    return (
      <div className="scroll-wrapper">
        <table className="prop-table">
          <thead>
            <Row>
              <Header>Name</Header>
              <Header>Type</Header>
              <Header>Default Value</Header>
              <Header>Description</Header>
            </Row>
          </thead>
          <tbody>
            {attributes.map(attribute => {
              const { name, required, defaultValue, description } = attribute;
              const type = getPrettyType(attribute, file);
              return (
                <Row key={name}>
                  <Cell>{`${name}${required ? ` *` : ""}`}</Cell>
                  <Cell>
                    <code
                      className={cn("prop-table__code", {
                        "prop-table__code--multiline": type.multiline,
                      })}
                    >
                      {type.children}
                    </code>
                  </Cell>
                  <Cell>
                    {defaultValue && <code className="prop-table__code">{defaultValue}</code>}
                  </Cell>
                  <Cell className="prop-table__description">
                    <Markdown markdown={description} />
                  </Cell>
                </Row>
              );
            })}
            {recommendedExternals}
          </tbody>
        </table>
      </div>
    );
  }
}
