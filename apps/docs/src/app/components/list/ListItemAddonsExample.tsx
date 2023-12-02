import { List, ListItem } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import VolumeOffOutlinedIcon from "@react-md/material-icons/VolumeOffOutlinedIcon";
import VolumeUpOutlinedIcon from "@react-md/material-icons/VolumeUpOutlinedIcon";
import { type ReactElement } from "react";

export default function ListItemAddonsExample(): ReactElement {
  return (
    <List>
      <ListItem leftAddon={<FavoriteIcon />}>Left Addon</ListItem>
      <ListItem rightAddon={<VolumeOffOutlinedIcon />}>Right Addon</ListItem>
      <ListItem
        leftAddon={<VolumeUpOutlinedIcon />}
        rightAddon={<VolumeOffOutlinedIcon />}
        secondaryText="But also secondary text"
      >
        Left and Right Addon
      </ListItem>
    </List>
  );
}
