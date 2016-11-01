import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import Chip from 'react-md/lib/Chips';

const SimpleExamples = () => (
  <div className="chip-list">
    <Chip label="Hello, World" />
    <Chip label="I can be removed" removable />
    <Chip
      label="I have an Avatar"
      avatar={<Avatar random>A</Avatar>}
    />
    <Chip
      label="Removable and Avatar"
      avatar={<Avatar random>R</Avatar>}
      removable
    />
  </div>
);

export default SimpleExamples;
