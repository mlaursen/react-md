import React from "react";
import { TextContainer } from "@react-md/typography";

import Heading from "components/Heading";

export default () => (
  <TextContainer>
    <Heading id="api" level={2}>
      API
    </Heading>
    <Heading id="coming-soon" level={4}>
      Coming Soon?
    </Heading>
  </TextContainer>
);
