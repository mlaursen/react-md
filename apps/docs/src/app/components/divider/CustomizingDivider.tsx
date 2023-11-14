import { Divider, TextContainer, Typography } from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./CustomizingDivider.module.scss";

export default function CustomizingDivider(): ReactElement {
  return (
    <TextContainer className={styles.container}>
      <Typography>Here is some text to separate.</Typography>
      <Divider />
      <Typography>Second paragraph of text.</Typography>
    </TextContainer>
  );
}
