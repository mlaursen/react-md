import React, { FunctionComponent } from "react";
import { TextContainer } from "@react-md/typography";

import Heading from "components/Heading";

const InProgress: FunctionComponent<{ title: string }> = ({ title }) => (
  <TextContainer>
    <Heading id={title.toLowerCase()} level={2}>
      {title}
    </Heading>
    <Heading id="coming-soon" level={4}>
      Coming Soon?
    </Heading>
  </TextContainer>
);

export default InProgress;
