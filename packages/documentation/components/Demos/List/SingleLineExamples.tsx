import React, { FunctionComponent } from "react";
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

const SingleLineExamples: FunctionComponent = () => (
  <Container>
    <List>
      {people.slice(0, 5).map((name, i) => (
        <ListItem key={name} id={`simple-item-${i}`}>
          {name}
        </ListItem>
      ))}
    </List>
    <List>
      <ListItem id="icon-item-0" leftIcon={<AppsSVGIcon />}>
        Apps
      </ListItem>
      <ListItem id="icon-item-1" rightIcon={<ArchiveSVGIcon />}>
        Archive
      </ListItem>
      <ListItem
        id="icon-item-2"
        leftIcon={<ArrowBackSVGIcon />}
        rightIcon={<ArchiveSVGIcon />}
        textChildren
      >
        Go Back and Archive
      </ListItem>
      <Divider />
      <ListItem
        id="icon-item-3"
        leftAvatar={<Avatar src="https://picsum.photos/40?image=54" alt="" />}
      >
        {people[11]}
      </ListItem>
      <ListItem
        id="icon-item-4"
        rightAvatar={<Avatar src="https://picsum.photos/40?image=45" alt="" />}
      >
        {people[12]}
      </ListItem>
      <Divider inset />
      <ListItem
        id="icon-item-5"
        leftAvatar={<Avatar src="https://picsum.photos/40?image=844" alt="" />}
        rightIcon={<DeleteSVGIcon />}
      >
        {people[13]}
      </ListItem>
      <ListItem
        id="icon-item-6"
        leftIcon={<AdjustSVGIcon />}
        rightAvatar={<Avatar src="https://picsum.photos/40?image=553" alt="" />}
      >
        {people[14]}
      </ListItem>
    </List>
    <List>
      <ListItem
        id="media-item-0"
        leftMedia={<img src="https://picsum.photos/56?image=700" alt="" />}
      >
        With a graphic
      </ListItem>
      <ListItem
        id="media-item-1"
        leftMediaLarge={
          <img src="https://picsum.photos/100/56?image=800" alt="" />
        }
      >
        With a large graphic
      </ListItem>
      <ListItem
        id="media-item-2"
        rightMedia={<img src="https://picsum.photos/56?image=700" alt="" />}
      >
        With a graphic
      </ListItem>
      <ListItem
        id="media-item-3"
        rightMediaLarge={
          <img src="https://picsum.photos/100/56?image=800" alt="" />
        }
      >
        With a large graphic
      </ListItem>
    </List>
  </Container>
);

export default SingleLineExamples;
