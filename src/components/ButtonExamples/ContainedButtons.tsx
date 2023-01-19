import { Box, Button } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import type { ReactElement } from "react";

export function ContainedButtons(): ReactElement {
  return (
    <>
      <Box>
        <Button themeType="contained">Button</Button>
        <Button themeType="contained">
          <FavoriteIcon />
          Button
        </Button>
        <Button themeType="contained">
          Button
          <StarIcon />
        </Button>
        <Button themeType="contained">
          <FavoriteIcon />
          Button
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="primary" themeType="contained">
          Primary
        </Button>
        <Button theme="primary" themeType="contained">
          <FavoriteIcon />
          Primary
        </Button>
        <Button theme="primary" themeType="contained">
          Primary
          <StarIcon />
        </Button>
        <Button theme="primary" themeType="contained">
          <FavoriteIcon />
          Primary
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="secondary" themeType="contained">
          Secondary
        </Button>
        <Button theme="secondary" themeType="contained">
          <FavoriteIcon />
          Secondary
        </Button>
        <Button theme="secondary" themeType="contained">
          Secondary
          <StarIcon />
        </Button>
        <Button theme="secondary" themeType="contained">
          <FavoriteIcon />
          Secondary
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="warning" themeType="contained">
          Warning
        </Button>
        <Button theme="warning" themeType="contained">
          <FavoriteIcon />
          Warning
        </Button>
        <Button theme="warning" themeType="contained">
          Warning
          <StarIcon />
        </Button>
        <Button theme="warning" themeType="contained">
          <FavoriteIcon />
          Warning
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="error" themeType="contained">
          Error
        </Button>
        <Button theme="error" themeType="contained">
          <FavoriteIcon />
          Error
        </Button>
        <Button theme="error" themeType="contained">
          Error
          <StarIcon />
        </Button>
        <Button theme="error" themeType="contained">
          <FavoriteIcon />
          Error
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button disabled themeType="contained">
          Disabled
        </Button>
        <Button disabled themeType="contained">
          <FavoriteIcon />
          Disabled
        </Button>
        <Button disabled themeType="contained">
          Disabled
          <StarIcon />
        </Button>
        <Button disabled themeType="contained">
          <FavoriteIcon />
          Disabled
          <StarIcon />
        </Button>
      </Box>
    </>
  );
}
