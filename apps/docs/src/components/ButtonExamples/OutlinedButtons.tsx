import { Box, Button } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import type { ReactElement } from "react";

export function OutlinedButtons(): ReactElement {
  return (
    <>
      <Box>
        <Button themeType="outline">Button</Button>
        <Button themeType="outline">
          <FavoriteIcon />
          Button
        </Button>
        <Button themeType="outline">
          Button
          <StarIcon />
        </Button>
        <Button themeType="outline">
          <FavoriteIcon />
          Button
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="primary" themeType="outline">
          Primary
        </Button>
        <Button theme="primary" themeType="outline">
          <FavoriteIcon />
          Primary
        </Button>
        <Button theme="primary" themeType="outline">
          Primary
          <StarIcon />
        </Button>
        <Button theme="primary" themeType="outline">
          <FavoriteIcon />
          Primary
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="secondary" themeType="outline">
          Secondary
        </Button>
        <Button theme="secondary" themeType="outline">
          <FavoriteIcon />
          Secondary
        </Button>
        <Button theme="secondary" themeType="outline">
          Secondary
          <StarIcon />
        </Button>
        <Button theme="secondary" themeType="outline">
          <FavoriteIcon />
          Secondary
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="warning" themeType="outline">
          Warning
        </Button>
        <Button theme="warning" themeType="outline">
          <FavoriteIcon />
          Warning
        </Button>
        <Button theme="warning" themeType="outline">
          Warning
          <StarIcon />
        </Button>
        <Button theme="warning" themeType="outline">
          <FavoriteIcon />
          Warning
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="error" themeType="outline">
          Error
        </Button>
        <Button theme="error" themeType="outline">
          <FavoriteIcon />
          Error
        </Button>
        <Button theme="error" themeType="outline">
          Error
          <StarIcon />
        </Button>
        <Button theme="error" themeType="outline">
          <FavoriteIcon />
          Error
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button disabled themeType="outline">
          Disabled
        </Button>
        <Button disabled themeType="outline">
          <FavoriteIcon />
          Disabled
        </Button>
        <Button disabled themeType="outline">
          Disabled
          <StarIcon />
        </Button>
        <Button disabled themeType="outline">
          <FavoriteIcon />
          Disabled
          <StarIcon />
        </Button>
      </Box>
    </>
  );
}
