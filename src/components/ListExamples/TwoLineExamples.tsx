import { Avatar, List, ListItem, ListSubheader } from "@react-md/core";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import InfoOutlineIcon from "@react-md/material-icons/InfoOutlineIcon";
import type { ReactElement } from "react";

export function TwoLineExamples(): ReactElement {
  return (
    <List style={{ width: "100%", maxWidth: 320 }}>
      <ListSubheader>Folders</ListSubheader>
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
      <ListItem
        leftAddon={
          <Avatar color="green">
            <FolderIcon />
          </Avatar>
        }
        leftAddonType="avatar"
        secondaryText="Jun 17, 2022"
        rightAddon={<InfoOutlineIcon />}
      >
        Recipes
      </ListItem>
      <ListItem
        leftAddon={
          <Avatar color="red">
            <FolderIcon />
          </Avatar>
        }
        leftAddonType="avatar"
        secondaryText="Jun 17, 2022"
        rightAddon={<InfoOutlineIcon />}
      >
        Work
      </ListItem>
    </List>
  );
}
