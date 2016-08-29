import React from 'react';

import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';

import { randomImage } from 'utils/RandomUtils';

const AvatarExamples = () => {
  const colors = Avatar.defaultProps.suffixes.map(suffix => (
    <Avatar key={suffix} suffix={suffix}>{suffix.charAt(0).toUpperCase()}</Avatar>
  ));

  return (
    <div>
      <div className="middle-align">
        <Avatar src={randomImage()} alt="Some image from unsplash.it" />
        <span>Avatar with a random image from https://unsplash.it/</span>
      </div>
      <div className="middle-align">
        <Avatar icon={<FontIcon iconClassName="fa fa-hand-spock-o" />} />
        <span>Avatar with a Font Awesome icon.</span>
      </div>
      <div className="middle-align">
        <Avatar icon={<FontIcon iconClassName="fa fa-rocket" />} random />
        <span>Avatar with a Font Awesome icon and a random color.</span>
      </div>
      <div className="middle-align">
        <Avatar>M</Avatar>
        <span>Avatar with a Letter and default color.</span>
      </div>
      <div className="middle-align">
        <Avatar random>O</Avatar>
        <span>Avatar with a Letter and a random color.</span>
      </div>
      <div className="avatar-list">
        <h4 className="md-subheading-1">All the default colors</h4>
        {colors}
      </div>
    </div>
  );
};

export default AvatarExamples;
