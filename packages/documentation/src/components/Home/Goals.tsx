import React, { FC } from "react";
import { TextContainer } from "@react-md/typography";

import { Markdown } from "components/Markdown";

import markdown from "./Goals.md";
import styles from "./Goals.module.scss";

const Goals: FC = () => (
  <TextContainer className={styles.goals}>
    <Markdown>{markdown}</Markdown>
  </TextContainer>
);

export default Goals;
