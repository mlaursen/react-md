import React, { FunctionComponent, Fragment } from "react";
import { Text } from "@react-md/typography";

import { Code } from "components/Code";
import Link from "components/Link";
import Heading from "components/Heading";

export interface IStyleInfoProps {
  isStyleable?: boolean;
}

const StyleInfo: FunctionComponent<IStyleInfoProps> = ({ isStyleable }) => {
  if (!isStyleable) {
    return null;
  }

  return (
    <Fragment>
      <Heading id="scss-and-styles" level={5}>
        SCSS and Styles
      </Heading>
      <Text>
        This package also exposes styles via SCSS. If you have not done so
        already, please read the main documentation about{" "}
        <Link href="/installation#including-styles">including styles</Link> in{" "}
        <Code>react-md</Code> to get an understanding of the naming paradigm for
        variables, functions, and mixins within react-md.
      </Text>
    </Fragment>
  );
};

export default StyleInfo;
