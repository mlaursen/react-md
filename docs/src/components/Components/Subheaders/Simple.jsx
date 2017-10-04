import React from 'react';
import {
  Avatar,
  Subheader,
  Divider,
  List,
  ListItem,
} from 'react-md';

import { randomImage } from 'utils/random';

const Simple = () => (
  <div className="md-grid">
    <List className="md-cell md-paper md-paper--1">
      <Subheader primary primaryText="Primary Styled" />
      <ListItem primaryText="First" />
      <ListItem primaryText="Second" />
      <ListItem primaryText="Third" />
    </List>
    <List className="md-cell md-paper md-paper--1">
      <Subheader primaryText="Inset" inset />
      <Divider inset />
      <ListItem primaryText="First" leftAvatar={<Avatar src={randomImage()} role="presentation" />} />
      <ListItem primaryText="Second" leftAvatar={<Avatar src={randomImage()} role="presentation" />} />
      <ListItem primaryText="Third" leftAvatar={<Avatar src={randomImage()} role="presentation" />} />
    </List>
  </div>
);

export default Simple;
