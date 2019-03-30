import React, { Fragment, FunctionComponent } from "react";
import { Text } from "@react-md/typography";
import { CodeBlock } from "components/Code";
import Heading from "components/Heading";
import { PackageSassDoc } from "types/formattedSassDoc.d";
import { Markdown } from "components/Markdown";

export interface SassDocPageProps {
  sassdoc: PackageSassDoc;
}

const SassDocPage: FunctionComponent<SassDocPageProps> = ({ sassdoc }) => {
  const { variables, functions, mixins } = sassdoc;
  return (
    <Fragment>
      <Heading id="sassdoc-variables" level={2}>
        Variables
      </Heading>
      {variables.map(v => {
        const { name, code, description, type, derived, value } = v;
        return (
          <div key={name}>
            <Text>{type}</Text>
            <Heading id={`variable-${name}`} level={6} noMargin>
              <CodeBlock language="scss">{derived ? value : code}</CodeBlock>
            </Heading>
            <Markdown>{description}</Markdown>
            <CodeBlock>{JSON.stringify(v, null, 2)}</CodeBlock>
          </div>
        );
      })}
    </Fragment>
  );
};

export default SassDocPage;
