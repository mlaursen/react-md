import { Divider } from "@react-md/core/divider/Divider";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
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
