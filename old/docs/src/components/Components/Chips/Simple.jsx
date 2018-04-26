import React from 'react';
import { Avatar, Chip, SVGIcon } from 'react-md';

import done from 'icons/done.svg';

const SimpleExamples = () => (
  <div className="chips__list">
    <Chip label="Hello, World" />
    <Chip label="Woop" removable>
      <SVGIcon use={done.url} />
    </Chip>
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
