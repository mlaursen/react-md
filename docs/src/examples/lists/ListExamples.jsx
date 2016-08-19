import React from 'react';
import { List, ListItem } from 'react-md/lib/Lists';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Divider from 'react-md/lib/Dividers';
import Subheader from 'react-md/lib/Subheaders';

import { randomAvatars } from 'utils/RandomUtils';

const InfoIcon = () => <FontIcon>info</FontIcon>;
const StarIcon = () => <FontIcon>star</FontIcon>;
const avatars = randomAvatars(3);

const ListExamples = () => (
  <div>
    <List subheader="Text Only List" className="example-list">
      <ListItem primaryText="Inbox" />
      <ListItem primaryText="Starred" />
      <ListItem primaryText="Sent Mail" />
      <ListItem primaryText="Drafts" />
    </List>
    <List className="example-list">
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
        leftAvatar={<Avatar className="avatar-blue" icon={<FontIcon>insert_drive_file</FontIcon>} />}
        rightIcon={<InfoIcon />}
        primaryText="Vacation itinerary"
        secondaryText="Jan 20, 2014"
      />
      <ListItem
        leftAvatar={<Avatar className="avatar-amber" icon={<FontIcon>insert_photo</FontIcon>} />}
        rightIcon={<InfoIcon />}
        primaryText="Kitchen remodel"
        secondaryText="Jan 10, 2014"
      />
    </List>
    <List subheader="Three line example" primarySubheader className="example-list">
      <ListItem
        leftAvatar={avatars[0]}
        rightIcon={<StarIcon />}
        primaryText="Brunch this weekend?"
        secondaryText={'Ali Connors\nI\'ll be in your neighborhood sometime this week'}
        threeLines
      />
      <ListItem
        leftAvatar={avatars[1]}
        rightIcon={<StarIcon />}
        primaryText="Summer BBQ"
        secondaryText={'to Alex, Scott, Jennifer\nWish I could come, but I\'m out of town this weekend.'}
        threeLines
      />
      <ListItem
        leftAvatar={avatars[2]}
        rightIcon={<StarIcon />}
        primaryText="Oui Oui"
        secondaryText="Sandra Adams - Do you have Paris recommendations? Have you ever been?"
        threeLines
      />
    </List>
  </div>
);

export default ListExamples;
