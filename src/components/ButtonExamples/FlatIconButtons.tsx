import { Box, Button } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

export function FlatIconButtons(): ReactElement {
  return (
    <Box>
      <Button aria-label="Favorite" buttonType="icon">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon" theme="primary">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon" theme="secondary">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon" theme="warning">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon" theme="error">
        <FavoriteIcon />
      </Button>
      <Button aria-label="Favorite" buttonType="icon" disabled>
        <FavoriteIcon />
      </Button>
    </Box>
  );
}
