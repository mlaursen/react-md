import { Button } from "react-md";
import { type ReactElement } from "react";

export default function SimpleButton(): ReactElement {
  return (
    <>
      <Button themeType="flat">Button</Button>
      <Button themeType="outline">Button</Button>
      <Button themeType="contained">Button</Button>
    </>
  );
}
