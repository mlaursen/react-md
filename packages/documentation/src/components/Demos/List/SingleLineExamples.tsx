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
import { LazyImage } from "@react-md/media";

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
        leftAvatar={
          <Avatar>
            <LazyImage src="https://picsum.photos/40?image=54" />
          </Avatar>
        }
      >
        {people[11]}
      </ListItem>
      <ListItem
        id="icon-item-4"
        rightAvatar={
          <Avatar>
            <LazyImage src="https://picsum.photos/40?image=45" />
          </Avatar>
        }
      >
        {people[12]}
      </ListItem>
      <Divider inset />
      <ListItem
        id="icon-item-5"
        leftAvatar={
          <Avatar>
            <LazyImage src="https://picsum.photos/40?image=844" />
          </Avatar>
        }
        rightIcon={<DeleteSVGIcon />}
      >
        {people[13]}
      </ListItem>
      <ListItem
        id="icon-item-6"
        leftIcon={<AdjustSVGIcon />}
        rightAvatar={
          <Avatar>
            <LazyImage src="https://picsum.photos/40?image=553" />
          </Avatar>
        }
      >
        {people[14]}
      </ListItem>
    </List>
    <List>
      <ListItem
        id="media-item-0"
        leftMedia={<LazyImage src="https://picsum.photos/56?image=700" />}
      >
        With a graphic
      </ListItem>
      <ListItem
        id="media-item-1"
        leftMediaLarge={
          <LazyImage src="https://picsum.photos/100/56?image=800" />
        }
      >
        With a large graphic
      </ListItem>
      <ListItem
        id="media-item-2"
        rightMedia={<LazyImage src="https://picsum.photos/56?image=700" />}
      >
        With a graphic
      </ListItem>
      <ListItem
        id="media-item-3"
        rightMediaLarge={
          <LazyImage src="https://picsum.photos/100/56?image=800" />
        }
      >
        With a large graphic
      </ListItem>
    </List>
  </Container>
);

export default SingleLineExamples;
