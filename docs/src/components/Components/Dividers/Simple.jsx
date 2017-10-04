import React from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  Subheader,
  TextField,
} from 'react-md';

import './_styles.scss';

const Simple = () => (
  <div>
    <section className="dividers__example md-paper md-paper--3">
      <TextField id="field-1" placeholder="Something" block paddedBlock />
      <Divider />
      <TextField id="field-2" placeholder="Something" block paddedBlock />
      <Divider />
    </section>
    <List className="dividers__example md-paper md-paper--3">
      <Subheader primaryText="Inset Example" />
      <ListItem primaryText="Item 1" leftAvatar={<Avatar random>L</Avatar>} />
      <ListItem primaryText="Item 2" leftAvatar={<Avatar random>S</Avatar>} />
      <Divider inset />
      <ListItem primaryText="Item 3" leftAvatar={<Avatar random>A</Avatar>} />
    </List>
  </div>
);

export default Simple;
