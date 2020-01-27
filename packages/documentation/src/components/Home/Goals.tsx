import React, { FC } from "react";
import { TextContainer } from "@react-md/typography";

import { Markdown } from "components/Markdown";

import markdown from "./Goals.md";

const Goals: FC = () => (
  <TextContainer className="home__goals">
    <Markdown>{markdown}</Markdown>
  </TextContainer>
);

export default Goals;
