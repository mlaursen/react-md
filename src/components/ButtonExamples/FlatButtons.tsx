import { Box, Button } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import StarIcon from "@react-md/material-icons/StarIcon";
import type { ReactElement } from "react";

export function FlatButtons(): ReactElement {
  return (
    <>
      <Box>
        <Button>Button</Button>
        <Button>
          <FavoriteIcon />
          Button
        </Button>
        <Button>
          Button
          <StarIcon />
        </Button>
        <Button>
          <FavoriteIcon />
          Button
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="primary">Primary</Button>
        <Button theme="primary">
          <FavoriteIcon />
          Primary
        </Button>
        <Button theme="primary">
          Primary
          <StarIcon />
        </Button>
        <Button theme="primary">
          <FavoriteIcon />
          Primary
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="secondary">Secondary</Button>
        <Button theme="secondary">
          <FavoriteIcon />
          Secondary
        </Button>
        <Button theme="secondary">
          Secondary
          <StarIcon />
        </Button>
        <Button theme="secondary">
          <FavoriteIcon />
          Secondary
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="warning">Warning</Button>
        <Button theme="warning">
          <FavoriteIcon />
          Warning
        </Button>
        <Button theme="warning">
          Warning
          <StarIcon />
        </Button>
        <Button theme="warning">
          <FavoriteIcon />
          Warning
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button theme="error">Error</Button>
        <Button theme="error">
          <FavoriteIcon />
          Error
        </Button>
        <Button theme="error">
          Error
          <StarIcon />
        </Button>
        <Button theme="error">
          <FavoriteIcon />
          Error
          <StarIcon />
        </Button>
      </Box>
      <Box>
        <Button disabled>Disabled</Button>
        <Button disabled>
          <FavoriteIcon />
          Disabled
        </Button>
        <Button disabled>
          Disabled
          <StarIcon />
        </Button>
        <Button disabled>
          <FavoriteIcon />
          Disabled
          <StarIcon />
        </Button>
      </Box>
    </>
  );
}
