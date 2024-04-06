import { Box, ListItemChildren } from "react-md";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import InfoOutlineIcon from "@react-md/material-icons/InfoOutlineIcon";
import { type ReactElement } from "react";

export default function ListItemChildrenExample(): ReactElement {
  return (
    <Box align="start" stacked disablePadding>
      <Box style={{ "--rmd-box-gap": 0 }} disablePadding>
        <ListItemChildren leftAddon={<FavoriteIcon />}>
          This is my favorite!
        </ListItemChildren>
      </Box>
      <div style={{ display: "flex" }}>
        <ListItemChildren
          leftAddon={<InfoOutlineIcon />}
          rightAddon={<FavoriteIcon />}
          secondaryText="Gotcha!"
        >
          Never mind, this might actually be my favorite!
        </ListItemChildren>
      </div>
    </Box>
  );
}
