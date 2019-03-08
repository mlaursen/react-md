import React, { FunctionComponent } from "react";
import Container from "./Container";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import {
  CloseSVGIcon,
  DeleteSVGIcon,
  ChatSVGIcon,
} from "@react-md/material-icons";

import "./custom-button-theme.scss";

const CustomButtonTheme: FunctionComponent = () => (
  <Container className="custom-button-themes">
    <Button id="custom-themed-button-1" themeType="outline" theme="secondary">
      Custom
    </Button>
    <Button
      id="custom-themed-button-2"
      buttonType="icon"
      themeType="outline"
      theme="primary"
    >
      <CloseSVGIcon />
    </Button>
    <Button id="custom-themed-button-3" themeType="contained" theme="error">
      <TextIconSpacing icon={<DeleteSVGIcon />}>Delete Forever</TextIconSpacing>
    </Button>
    <Button
      id="custom-themed-button-4"
      buttonType="icon"
      themeType="outline"
      theme="warning"
      className="custom-button-themes__big-icon"
    >
      <ChatSVGIcon />
    </Button>
  </Container>
);

export default CustomButtonTheme;
