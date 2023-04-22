import { Box } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import type { ReactElement } from "react";

export function FlexBoxExample(): ReactElement {
  return (
    <>
      <Box>
        <FavoriteIcon />
        Content
      </Box>
      <Box reversed>
        <FavoriteIcon />
        Content
      </Box>
      <Box stacked>
        <FavoriteIcon />
        Content
      </Box>
      <Box stacked reversed>
        <FavoriteIcon />
        Content
      </Box>
    </>
  );
}
