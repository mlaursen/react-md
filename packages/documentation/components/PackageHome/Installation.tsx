import React, { FunctionComponent, Fragment } from "react";
import { Text } from "@react-md/typography";

import { CodeBlock } from "components/Code";
import Heading from "components/Heading";

export interface IInstallationProps {
  name: string;
  recommendations: string[];
}

const Installation: FunctionComponent<IInstallationProps> = ({
  name,
  recommendations,
}) => {
  return (
    <Fragment>
      <Heading id="package-installation" level={3}>
        Installation
      </Heading>
      <CodeBlock language="bash">{`npm install --save @react-md/${name}`}</CodeBlock>
      {recommendations.length > 0 && (
        <Text>
          It is also recommended to install the following additional packages
          since they work hand-in-hand with this package:
        </Text>
      )}
      {recommendations.length > 0 && (
        <CodeBlock language="bash">
          {`npm install --save ${recommendations
            .map(n => `@react-md/${n}`)
            .join(" \\\n  ")}`}
        </CodeBlock>
      )}
    </Fragment>
  );
};

export default Installation;
