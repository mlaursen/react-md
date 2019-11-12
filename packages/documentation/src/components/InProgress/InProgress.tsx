import React, { FC } from "react";
import { TextContainer } from "@react-md/typography";

import Heading from "components/Heading";

const InProgress: FC<{ title: string }> = ({ title, children }) => (
  <TextContainer>
    <Heading id={title.toLowerCase()} level={2}>
      {title}
    </Heading>
    <Heading id="coming-soon" level={4}>
      Coming Soon?
    </Heading>
    {children}
  </TextContainer>
);

export default InProgress;
