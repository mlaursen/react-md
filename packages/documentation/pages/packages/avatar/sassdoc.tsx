import React from "react";
import { TextContainer } from "@react-md/typography";

import Heading from "components/Heading";

export default () => (
  <TextContainer>
    <Heading id="sassdoc" level={2}>
      SassDoc
    </Heading>
    <Heading id="coming-soon" level={4}>
      Coming Soon?
    </Heading>
  </TextContainer>
);
