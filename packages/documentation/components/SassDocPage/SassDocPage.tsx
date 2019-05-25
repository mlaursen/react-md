import React, { Fragment, FunctionComponent } from "react";
import { Text } from "@react-md/typography";

import { CodeBlock } from "components/Code";
import Heading from "components/Heading";
import { Markdown } from "components/Markdown";
import { PackageSassDoc } from "types/formattedSassDoc.d";

import VariableTable from "./VariableTable";

export interface SassDocPageProps {
  sassdoc: PackageSassDoc;
}

const SassDocPage: FunctionComponent<SassDocPageProps> = ({ sassdoc }) => {
  const { variables /*functions, mixins*/ } = sassdoc;
  return (
    <Fragment>
      <Heading id="sassdoc-variables" level={2}>
        Variables
      </Heading>
      <VariableTable variables={variables} />
      {variables.map(variable => {
        const { name, /*value,*/ compiledValue, description, type } = variable;
        console.log("variable:", variable);
        return (
          <div key={name}>
            <Text>{type}</Text>
            <Heading id={`variable-${name}`} level={6} margin="none">
              <CodeBlock language="scss">{compiledValue}</CodeBlock>
            </Heading>
            <Markdown>{description}</Markdown>
          </div>
        );
      })}
    </Fragment>
  );
};

export default SassDocPage;
