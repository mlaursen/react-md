import { Box, Button } from "@react-md/core";
import type { ReactElement } from "react";

export default function ContainedButton(): ReactElement {
  return (
    <Box>
      <Button themeType="contained">Clear</Button>
      <Button themeType="contained" theme="primary">
        Primary
      </Button>
      <Button themeType="contained" theme="secondary">
        Secondary
      </Button>
    </Box>
  );
}
