import { Box, Button } from "@react-md/core";
import { type ReactElement } from "react";

export default function SimpleButton(): ReactElement {
  return (
    <Box>
      <Button theme="primary" themeType="flat">
        Button
      </Button>
      <Button theme="primary" themeType="outline">
        Button
      </Button>
      <Button theme="primary" themeType="contained">
        Button
      </Button>
    </Box>
  );
}
