import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/core/typography/Typography";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function DisableFlexWrap(): ReactElement {
  return (
    <Box style={{ width: "12rem" }} disableWrap>
      <FavoriteIcon />
      <Typography textOverflow="ellipsis">
        Here is some long text that should be truncated
      </Typography>
    </Box>
  );
}
