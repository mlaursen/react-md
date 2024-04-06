import {
  AppBar,
  AppBarTitle,
  Button,
  ICON_CONFIG,
  List,
  ListItem,
} from "react-md";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import VolumeUpOutlinedIcon from "@react-md/material-icons/VolumeUpOutlinedIcon";
import { type ReactElement } from "react";

export default function DisablingLeftAddonSpacingExample(): ReactElement {
  return (
    <div>
      <AppBar>
        <Button buttonType="icon" aria-label="Menu">
          {ICON_CONFIG.menu}
        </Button>
        <AppBarTitle keyline="nav">Title</AppBarTitle>
      </AppBar>
      <List>
        <ListItem leftAddon={<FavoriteIcon />}>Left Addon</ListItem>
        <ListItem leftAddon={<VolumeUpOutlinedIcon />} disableLeftAddonSpacing>
          Left Addon No Spacing
        </ListItem>
      </List>
    </div>
  );
}
