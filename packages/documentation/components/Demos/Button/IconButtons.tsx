import React, { FC } from "react";
import Container from "./Container";
import { Button } from "@react-md/button";
import { FontIcon } from "@react-md/icon";
import { FavoriteSVGIcon, DeleteSVGIcon } from "@react-md/material-icons";

const IconButtons: FC = () => (
  <Container>
    <Button id="icon-button-1" buttonType="icon">
      <FontIcon>favorite</FontIcon>
    </Button>
    <Button
      id="icon-button-2"
      buttonType="icon"
      theme="secondary"
      aria-label="Favorite"
    >
      <FavoriteSVGIcon />
    </Button>
    <Button
      id="icon-button-3"
      buttonType="icon"
      theme="warning"
      aria-label="Move to Trash"
    >
      <DeleteSVGIcon />
    </Button>
    <Button
      id="icon-button-4"
      buttonType="icon"
      theme="error"
      aria-label="Permanently Delete"
    >
      <DeleteSVGIcon />
    </Button>
    <Button id="icon-button-5" buttonType="icon" theme="clear">
      <FontIcon>add</FontIcon>
    </Button>
    <Button
      id="icon-button-6"
      buttonType="icon"
      disabled
      aria-label="Disabled Add Button"
    >
      <FontIcon>add</FontIcon>
    </Button>
    <Button id="icon-button-7" buttonType="icon" themeType="outline">
      <FontIcon>favorite</FontIcon>
    </Button>
    <Button
      id="icon-button-8"
      buttonType="icon"
      theme="secondary"
      themeType="outline"
      aria-label="Favorite"
    >
      <FavoriteSVGIcon />
    </Button>
    <Button
      id="icon-button-9"
      buttonType="icon"
      theme="warning"
      themeType="contained"
      aria-label="Move to Trash"
    >
      <DeleteSVGIcon />
    </Button>
    <Button
      id="icon-button-10"
      buttonType="icon"
      theme="error"
      themeType="contained"
      aria-label="Permanently Delete"
    >
      <DeleteSVGIcon />
    </Button>
    <Button
      id="icon-button-11"
      buttonType="icon"
      theme="clear"
      themeType="outline"
    >
      <FontIcon>add</FontIcon>
    </Button>
    <Button
      id="icon-button-12"
      buttonType="icon"
      disabled
      aria-label="Disabled Add Button"
      themeType="outline"
    >
      <FontIcon>add</FontIcon>
    </Button>
  </Container>
);

export default IconButtons;
