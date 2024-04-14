import { Avatar } from "@react-md/core/avatar/Avatar";
import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import InfoOutlineIcon from "@react-md/material-icons/InfoOutlineIcon";
import { type ReactElement } from "react";

export default function AvatarAddonsExample(): ReactElement {
  return (
    <List>
      <ListItem leftAddon={<Avatar>A</Avatar>} leftAddonType="avatar">
        Left Avatar
      </ListItem>
      <ListItem rightAddon={<Avatar>A</Avatar>} rightAddonType="avatar">
        Right Avatar with some additional text
      </ListItem>
      <ListItem
        leftAddon={
          <Avatar size="icon" color="purple">
            I
          </Avatar>
        }
      >
        Icon-Sized Left Avatar
      </ListItem>
      <ListItem
        leftAddon={
          <Avatar color="blue">
            <FolderIcon />
          </Avatar>
        }
        leftAddonType="avatar"
        secondaryText="Jan 04, 2019"
        rightAddon={<InfoOutlineIcon />}
      >
        Photos
      </ListItem>
    </List>
  );
}
