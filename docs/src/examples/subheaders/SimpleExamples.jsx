import React from 'react';
import Subheader from 'react-md/lib/Subheaders';
import { List, ListItem } from 'react-md/lib/Lists';
import Avatar from 'react-md/lib/Avatars';

import { randomImage } from 'utils/RandomUtils';

const SimpleExamples = () => (
  <div>
    <List className="example-list">
      <Subheader primary primaryText="Primary Styled" />
      <ListItem primaryText="First" />
      <ListItem primaryText="Second" />
      <ListItem primaryText="Third" />
    </List>

    <List className="example-list">
      <Subheader primaryText="Inset" inset />
      <ListItem primaryText="First" leftAvatar={<Avatar src={randomImage()} />} />
      <ListItem primaryText="Second" leftAvatar={<Avatar src={randomImage()} />} />
      <ListItem primaryText="Third" leftAvatar={<Avatar src={randomImage()} />} />
    </List>
  </div>
);

export default SimpleExamples;
