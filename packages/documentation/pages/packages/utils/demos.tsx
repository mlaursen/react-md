import React from "react";
import { TextContainer } from "@react-md/typography";

import Heading from "components/Heading";
// import PackageName from "components/Demos/PackageName";

// export default () => <PackageName />;

export default () => (
  <TextContainer>
    <Heading id="demos" level={2}>
      Demos
    </Heading>
    <Heading id="coming-soon" level={4}>
      Coming Soon?
    </Heading>
  </TextContainer>
);
