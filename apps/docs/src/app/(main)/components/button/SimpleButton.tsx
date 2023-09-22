import { Box, Button } from "@react-md/core";
import { type ReactElement } from "react";

export default function SimpleButton(): ReactElement {
  return (
    <Box>
      <Button themeType="flat">Button</Button>
      <Button themeType="outline">Button</Button>
      <Button themeType="contained">Button</Button>
    </Box>
  );
}
