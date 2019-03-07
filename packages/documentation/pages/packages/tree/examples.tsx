import React, { FunctionComponent, Fragment } from "react";

import Heading from "components/Heading";
import Simple from "components/TreeExamples/Simple";

const Examples: FunctionComponent = () => {
  return (
    <Fragment>
      <Heading id="examples" level={2}>
        Examples
      </Heading>
      <Simple />
    </Fragment>
  );
};

export default Examples;
