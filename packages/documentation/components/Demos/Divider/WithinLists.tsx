import React, { FunctionComponent } from "react";
import { Divider } from "@react-md/divider";
import { List, ListItem } from "@react-md/list";

import Container from "./Container";
import {
  FavoriteSVGIcon,
  BookSVGIcon,
  TvSVGIcon,
  AddSVGIcon,
  TocSVGIcon,
  AdbSVGIcon,
} from "@react-md/material-icons";

const WithinLists: FunctionComponent = () => (
  <Container>
    <List>
      <ListItem id="list1-item-0">First Item</ListItem>
      <ListItem id="list1-item-1">Second Item</ListItem>
      <ListItem id="list1-item-2">Third Item</ListItem>
      <ListItem id="list1-item-3">Forth Item</ListItem>
      <Divider />
      <ListItem id="list1-item-3">Fifth Item</ListItem>
      <ListItem id="list1-item-5">Sixth Item</ListItem>
    </List>
    <List>
      <ListItem id="list2-item-0" leftIcon={<FavoriteSVGIcon />}>
        First Item
      </ListItem>
      <ListItem id="list2-item-1" leftIcon={<BookSVGIcon />}>
        Second Item
      </ListItem>
      <ListItem id="list2-item-2" leftIcon={<TvSVGIcon />}>
        Third Item
      </ListItem>
      <ListItem id="list2-item-3" leftIcon={<AddSVGIcon />}>
        Forth Item
      </ListItem>
      <Divider inset />
      <ListItem id="list2-item-3" leftIcon={<TocSVGIcon />}>
        Fifth Item
      </ListItem>
      <ListItem id="list2-item-5" leftIcon={<AdbSVGIcon />}>
        Sixth Item
      </ListItem>
    </List>
  </Container>
);

export default WithinLists;
