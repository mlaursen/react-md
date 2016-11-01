import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';

import randomImage from 'utils/RandomUtils/randomImage';
import SimpleListItem from './SimpleListItem';

const SimpleExamples = () => (
  <ul className="md-list">
    <SimpleListItem
      label="An Avatar with a random image from https://unsplash.it"
      avatar={<Avatar src={randomImage()} role="presentation" />}
    />
    <SimpleListItem
      label="An Avatar with a FontAwesome icon."
      avatar={<Avatar icon={<FontIcon iconClassName="fa fa-hand-spock-o" />} />}
    />
    <SimpleListItem
      label="An avatar with a FontAwesome icon and a random color."
      avatar={<Avatar icon={<FontIcon iconClassName="fa fa-rocket" />} random />}
    />
    <SimpleListItem
      label="An Avatar using a Letter and the default color."
      avatar={<Avatar>M</Avatar>}
    />
    <SimpleListItem
      label="An Avatar using a Letter and a random color."
      avatar={<Avatar random>O</Avatar>}
    />
  </ul>
);

export default SimpleExamples;
