import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { ICON_CONFIG } from "@react-md/core/icon/config";
import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
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
