import { Box, Button } from "@react-md/core";
import type { ReactElement } from "react";

export default function OutlinedButton(): ReactElement {
  return (
    <Box>
      <Button themeType="outline">Clear</Button>
      <Button themeType="outline" theme="primary">
        Primary
      </Button>
      <Button themeType="outline" theme="secondary">
        Secondary
      </Button>
    </Box>
  );
}
