import { Box, Button } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

export function OutlinedIconButtons(): ReactElement {
  return (
    <Box>
      <Button aria-label="Favorite" buttonType="icon" themeType="outline">
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="primary"
        themeType="outline"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="secondary"
        themeType="outline"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="warning"
        themeType="outline"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="error"
        themeType="outline"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        disabled
        themeType="outline"
      >
        <FavoriteIcon />
      </Button>
    </Box>
  );
}
