import { Button } from "@react-md/core/button/Button";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function ThemedButton(): ReactElement {
  return (
    <>
      <Button>Clear</Button>
      <Button theme="primary">Primary</Button>
      <Button theme="secondary">Secondary</Button>
      <Button theme="warning" themeType="outline">
        Warning
      </Button>
      <Button theme="success" themeType="contained">
        Success
        <FavoriteIcon />
      </Button>
      <Button theme="error" themeType="contained">
        <FavoriteIcon />
        Error
      </Button>
      <Button disabled>Disabled</Button>
    </>
  );
}
