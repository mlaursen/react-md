import { Button } from "@react-md/core/button/Button";
import { type ReactElement } from "react";

export default function ContainedButton(): ReactElement {
  return (
    <>
      <Button themeType="contained">Clear</Button>
      <Button themeType="contained" theme="primary">
        Primary
      </Button>
      <Button themeType="contained" theme="secondary">
        Secondary
      </Button>
    </>
  );
}
