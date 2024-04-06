import { Button } from "react-md";
import { type ReactElement } from "react";

export default function OutlinedButton(): ReactElement {
  return (
    <>
      <Button themeType="outline">Clear</Button>
      <Button themeType="outline" theme="primary">
        Primary
      </Button>
      <Button themeType="outline" theme="secondary">
        Secondary
      </Button>
    </>
  );
}
