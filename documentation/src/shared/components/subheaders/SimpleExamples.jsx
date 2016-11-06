import React from 'react';
import Subheader from 'react-md/lib/Subheaders';
import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

import randomAvatars from 'utils/RandomUtils/randomAvatars';
const avatars = randomAvatars(3);

const SimpleExamples = () => (
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
      <ListItem primaryText="First" leftAvatar={avatars[0]} />
      <ListItem primaryText="Second" leftAvatar={avatars[1]} />
      <ListItem primaryText="Third" leftAvatar={avatars[2]} />
    </List>
  </div>
);

export default SimpleExamples;
