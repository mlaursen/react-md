import React from 'react';
import Divider from 'react-md/lib/Dividers';
import { List, ListItem, ListSubheader } from 'react-md/lib/Lists';

import { randomAvatars } from '../utils';

const MDASH = ' \u2014 ';
const avatars = randomAvatars(4);

const MessageList = () => {
  return (
    <List>
      <ListSubheader primaryText="Today" />
      <ListItem
        primaryText="Brunch this weekend?"
        secondaryText={(
          <span>
            <span>Ali Connors</span>
            {MDASH}
            <span className="md-secondary-text">I'll be in your neighborhood at some point</span>
          </span>
        )}
        leftAvatar={avatars[0]}
      />
      <Divider inset />
      <ListItem
        primaryText={(
          <span>
            <span>Summer BBQ</span>
            <span className="md-secondary-text">{' 4 '}</span>
          </span>
        )}
        secondaryText={(
          <span>
            <span>to Alex, Scott, Jennifer</span>
            {MDASH}
            <span className="md-secondary-text">Wish I could read more text</span>
          </span>
        )}
        leftAvatar={avatars[1]}
      />
      <Divider inset />
      <ListItem
        primaryText="Oui Oui"
        secondaryText={(
          <span>
            <span>Sandra Adams</span>
            {MDASH}
            <span className="md-secondary-text">Do you have Paris recorded</span>
          </span>
        )}
        leftAvatar={avatars[2]}
      />
      <Divider inset />
      <ListItem
        primaryText="Lorem Ipsum dolor sit amet"
        secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi enim, eleifend vel aliquam ac, cursus in metus. Nullam luctus."
        leftAvatar={avatars[3]}
      />
    </List>
  );
};

export default MessageList;
