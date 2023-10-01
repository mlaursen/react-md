import { AsyncButton, Box, wait } from "@react-md/core";
import type { ReactElement } from "react";

export default function AsyncButtonPromise(): ReactElement {
  return (
    <Box>
      <AsyncButton onClick={() => wait(4000)}>Click Me</AsyncButton>
      <AsyncButton
        onClick={() => wait(4000)}
        theme="primary"
        themeType="outline"
      >
        Click Me
      </AsyncButton>
      <AsyncButton
        onClick={() => wait(4000)}
        theme="secondary"
        themeType="contained"
      >
        Click Me
      </AsyncButton>
    </Box>
  );
}