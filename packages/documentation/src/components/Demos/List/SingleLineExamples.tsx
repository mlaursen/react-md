import React, { FC } from "react";
import { Avatar } from "@react-md/avatar";
import { Divider } from "@react-md/divider";
import { List, ListItem } from "@react-md/list";
import {
  AdjustSVGIcon,
  AppsSVGIcon,
  ArchiveSVGIcon,
  ArrowBackSVGIcon,
  DeleteSVGIcon,
} from "@react-md/material-icons";

import people from "constants/people";

import Container from "./Container";

const SingleLineExamples: FC = () => (
  <Container>
    <List>
      {people.slice(0, 5).map((name, i) => (
        <ListItem key={name} id={`simple-item-${i}`}>
          {name}
        </ListItem>
      ))}
    </List>
    <List>
      <ListItem id="icon-item-0" leftAddon={<AppsSVGIcon />}>
        Apps
      </ListItem>
      <ListItem id="icon-item-1" rightAddon={<ArchiveSVGIcon />}>
        Archive
      </ListItem>
      <ListItem
        id="icon-item-2"
        leftAddon={<ArrowBackSVGIcon />}
        rightAddon={<ArchiveSVGIcon />}
        textChildren
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
        rightAddon={<DeleteSVGIcon />}
      >
        {people[13]}
      </ListItem>
      <ListItem
        id="icon-item-6"
        leftAddon={<AdjustSVGIcon />}
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
        leftAddon={<img src="https://picsum.photos/100/56?image=800" alt="" />}
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
        rightAddon={<img src="https://picsum.photos/100/56?image=800" alt="" />}
        rightAddonType="large-media"
      >
        With a large graphic
      </ListItem>
    </List>
  </Container>
);

export default SingleLineExamples;
