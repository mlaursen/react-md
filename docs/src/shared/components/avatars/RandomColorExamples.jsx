import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import Subheader from 'react-md/lib/Subheaders';

const RandomColorExamples = () => (
  <ul className="md-list">
    <Subheader primaryText="All default colors" />
    {Avatar.defaultProps.suffixes.map(suffix => (
      <Avatar key={suffix} suffix={suffix} style={{ margin: '1em' }}>{suffix.charAt(0).toUpperCase()}</Avatar>
    ))}
  </ul>
);

export default RandomColorExamples;
