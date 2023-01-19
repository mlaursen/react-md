import { Avatar, Divider, List, ListItem } from "@react-md/core";
import AdjustIcon from "@react-md/material-icons/AdjustIcon";
import AppsIcon from "@react-md/material-icons/AppsIcon";
import ArchiveIcon from "@react-md/material-icons/ArchiveIcon";
import ArrowBackIcon from "@react-md/material-icons/ArrowBackIcon";
import DeleteIcon from "@react-md/material-icons/DeleteIcon";
import type { ReactElement } from "react";
import { people } from "src/constants/people";

export function SingleLineExamples(): ReactElement {
  return (
    <>
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
      <List>
        <ListItem leftAddon={<AppsIcon />}>Apps</ListItem>
        <ListItem rightAddon={<ArchiveIcon />}>Archive</ListItem>
        <ListItem
          id="icon-item-2"
          leftAddon={<ArrowBackIcon />}
          rightAddon={<ArchiveIcon />}
        >
          Go Back and Archive
        </ListItem>
        <Divider />
        <ListItem
          id="icon-item-3"
          leftAddon={
            <Avatar>
              <img src="https://picsum.photos/40?image=54" alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
        >
          {people[11]}
        </ListItem>
        <ListItem
          id="icon-item-4"
          rightAddon={
            <Avatar>
              <img src="https://picsum.photos/40?image=45" alt="" />
            </Avatar>
          }
          rightAddonType="avatar"
        >
          {people[12]}
        </ListItem>
        <Divider inset />
        <ListItem
          id="icon-item-5"
          leftAddon={
            <Avatar>
              <img src="https://picsum.photos/40?image=844" alt="" />
            </Avatar>
          }
          leftAddonType="avatar"
          rightAddon={<DeleteIcon />}
        >
          {people[13]}
        </ListItem>
        <ListItem
          id="icon-item-6"
          leftAddon={<AdjustIcon />}
          rightAddon={
            <Avatar>
              <img src="https://picsum.photos/40?image=553" alt="" />
            </Avatar>
          }
          rightAddonType="avatar"
        >
          {people[14]}
        </ListItem>
      </List>
      <List>
        <ListItem
          id="media-item-0"
          leftAddon={<img src="https://picsum.photos/56?image=700" alt="" />}
          leftAddonType="media"
        >
          With a graphic
        </ListItem>
        <ListItem
          id="media-item-1"
          leftAddon={
            <img src="https://picsum.photos/100/56?image=800" alt="" />
          }
          leftAddonType="large-media"
        >
          With a large graphic
        </ListItem>
        <ListItem
          id="media-item-2"
          rightAddon={<img src="https://picsum.photos/56?image=700" alt="" />}
          rightAddonType="media"
        >
          With a graphic
        </ListItem>
        <ListItem
          id="media-item-3"
          rightAddon={
            <img src="https://picsum.photos/100/56?image=800" alt="" />
          }
          rightAddonType="large-media"
        >
          With a large graphic
        </ListItem>
      </List>
    </>
  );
}
