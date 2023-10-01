import { AsyncButton, Box, wait } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

export default function CustomLoadingChildren(): ReactElement {
  return (
    <Box>
      <AsyncButton
        onClick={() => wait(4000)}
        loadingType="linear-below"
        loadingChildren="Loading..."
        loadingDisabledTheme
      >
        Click Me
      </AsyncButton>
      <AsyncButton
        onClick={() => wait(4000)}
        theme="primary"
        themeType="outline"
        loadingType="circular-before"
        loadingChildren="Loading..."
        loadingDisabledTheme
        beforeAddon={<FavoriteIcon />}
      >
        Click Me
      </AsyncButton>
    </Box>
  );
}
