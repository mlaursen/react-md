import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  SimpleListItem,
  ListItem,
  ListSubheader,
  ListItemLink,
} from "@react-md/list";
import { TextContainer, Text } from "@react-md/typography";
import {
  InboxSVGIcon,
  StarBorderSVGIcon,
  MailSVGIcon,
  DraftsSVGIcon,
  FolderSVGIcon,
  InfoSVGIcon,
  HomeSVGIcon,
} from "@react-md/material-icons";
import { Avatar } from "@react-md/avatar";
import { Divider } from "@react-md/divider";

const ListDemo: FunctionComponent = () => (
  <TextContainer>
    <Text type="headline-3">List Demo</Text>
    <List>
      <SimpleListItem>Inbox</SimpleListItem>
      <SimpleListItem>Starred</SimpleListItem>
      <SimpleListItem>Sent Mail</SimpleListItem>
      <SimpleListItem>Drafts</SimpleListItem>
    </List>
    <List>
      <SimpleListItem leftIcon={<InboxSVGIcon />}>Inbox</SimpleListItem>
      <SimpleListItem leftIcon={<StarBorderSVGIcon />}>Starred</SimpleListItem>
      <SimpleListItem leftIcon={<MailSVGIcon />}>Sent Mail</SimpleListItem>
      <SimpleListItem leftIcon={<DraftsSVGIcon />}>Drafts</SimpleListItem>
    </List>
    <List>
      <ListItem id="clickable-item-1" leftIcon={<InboxSVGIcon />}>
        Inbox
      </ListItem>
      <ListItem id="clickable-item-2" leftIcon={<StarBorderSVGIcon />}>
        Starred
      </ListItem>
      <ListItem id="clickable-item-3" leftIcon={<MailSVGIcon />}>
        Sent Mail
      </ListItem>
      <ListItem id="clickable-item-4" leftIcon={<DraftsSVGIcon />}>
        Drafts
      </ListItem>
    </List>
    <List>
      <ListSubheader inset>Folders</ListSubheader>
      <ListItem
        id="photos-item"
        leftAvatar={
          <Avatar>
            <FolderSVGIcon />
          </Avatar>
        }
        rightIcon={<InfoSVGIcon />}
        primaryText="Photos"
        secondaryText="Jan 9, 2014"
      />
      <Divider inset />
      <ListItem
        id="recent-item"
        leftAvatar={
          <Avatar>
            <FolderSVGIcon />
          </Avatar>
        }
        rightIcon={<InfoSVGIcon />}
        primaryText="Recent"
        secondaryText="Jan 9, 2018"
      />
      <ListItemLink
        id="link-item"
        to="/"
        component={NavLink}
        exact
        leftIcon={<HomeSVGIcon />}
        className="nav-item"
        activeClassName="nav-item--active"
      >
        Home
      </ListItemLink>
      <ListItemLink
        id="link-item"
        to="/folders"
        component={NavLink}
        leftIcon={<FolderSVGIcon />}
        className="nav-item"
        activeClassName="nav-item--active"
      >
        Folders
      </ListItemLink>
    </List>
  </TextContainer>
);

export default ListDemo;
