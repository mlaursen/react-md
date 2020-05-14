import React, { FC } from "react";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import {
  ChatSVGIcon,
  CloseSVGIcon,
  DeleteSVGIcon,
} from "@react-md/material-icons";

import Container from "./Container";

import styles from "./CustomButtonTheme.module.scss";

const CustomButtonTheme: FC = () => (
  <Container className={styles.container}>
    <Button id="custom-themed-button-1" themeType="outline" theme="secondary">
      Custom
    </Button>
    <Button
      id="custom-themed-button-2"
      buttonType="icon"
      themeType="outline"
      theme="primary"
      aria-label="Close"
    >
      <CloseSVGIcon />
    </Button>
    <Button id="custom-themed-button-3" themeType="contained" theme="error">
      <TextIconSpacing icon={<DeleteSVGIcon />}>Delete Forever</TextIconSpacing>
    </Button>
    <Button
      id="custom-themed-button-4"
      aria-label="Chat"
      buttonType="icon"
      themeType="outline"
      theme="warning"
      className={styles.large}
    >
      <ChatSVGIcon />
    </Button>
  </Container>
);

export default CustomButtonTheme;
