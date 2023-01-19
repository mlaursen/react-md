import { Box, Button } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

export function ContainedIconButtons(): ReactElement {
  return (
    <Box>
      <Button aria-label="Favorite" buttonType="icon" themeType="contained">
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="primary"
        themeType="contained"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="secondary"
        themeType="contained"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="warning"
        themeType="contained"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        theme="error"
        themeType="contained"
      >
        <FavoriteIcon />
      </Button>
      <Button
        aria-label="Favorite"
        buttonType="icon"
        disabled
        themeType="contained"
      >
        <FavoriteIcon />
      </Button>
    </Box>
  );
}
