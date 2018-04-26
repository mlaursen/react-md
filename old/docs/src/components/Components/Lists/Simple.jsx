import React from 'react';
import {
  Avatar,
  Divider,
  FontIcon,
  List,
  ListItem,
  Subheader,
} from 'react-md';

const InfoIcon = () => <FontIcon>info</FontIcon>;
const StarIcon = () => <FontIcon>star</FontIcon>;

const Simple = () => (
  <div className="md-grid">
    <List className="md-cell md-paper md-paper--1">
      <ListItem primaryText="Inbox" />
      <ListItem primaryText="Starred" />
      <ListItem primaryText="Sent Mail" />
      <ListItem primaryText="Drafts" />
    </List>
    <List className="md-cell md-paper md-paper--1">
      <Subheader primaryText="Folders" />
      <ListItem
        leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />}
        rightIcon={<InfoIcon />}
        primaryText="Photos"
        secondaryText="Jan 9, 2014"
      />
      <ListItem
        leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />}
        rightIcon={<InfoIcon />}
        primaryText="Recipes"
        secondaryText="Jan 17, 2014"
      />
      <ListItem
        leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />}
        rightIcon={<InfoIcon />}
        primaryText="Work"
        secondaryText="Jan 28, 2014"
      />
      <Divider inset />
      <Subheader primaryText="Files" />
      <ListItem
        leftAvatar={<Avatar suffix="blue" icon={<FontIcon>insert_drive_file</FontIcon>} />}
        rightIcon={<InfoIcon />}
        primaryText="Vacation itinerary"
        secondaryText="Jan 20, 2014"
      />
      <ListItem
        leftAvatar={<Avatar suffix="amber" icon={<FontIcon>insert_photo</FontIcon>} />}
        rightIcon={<InfoIcon />}
        primaryText="Kitchen remodel"
        secondaryText="Jan 10, 2014"
      />
    </List>
    <List className="md-cell md-paper md-paper--1">
      <Subheader primaryText="Three line example" primary />
      <ListItem
        leftAvatar={<Avatar suffix="deep-purple">B</Avatar>}
        rightIcon={<StarIcon />}
        primaryText="Brunch this weekend?"
        secondaryText={'Ali Connors\nI\'ll be in your neighborhood sometime this week'}
        threeLines
      />
      <ListItem
        leftAvatar={<Avatar suffix="green">Q</Avatar>}
        rightIcon={<StarIcon />}
        primaryText="Summer BBQ"
        secondaryText={'to Alex, Scott, Jennifer\nWish I could come, but I\'m out of town this weekend.'}
        threeLines
      />
      <ListItem
        leftAvatar={<Avatar suffix="orange">A</Avatar>}
        rightIcon={<StarIcon />}
        primaryText="Oui Oui"
        secondaryText="Sandra Adams - Do you have Paris recommendations? Have you ever been?"
        threeLines
      />
    </List>
  </div>
);

export default Simple;
