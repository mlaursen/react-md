import React from 'react';
import { FontIcon, IconSeparator } from 'react-md';

import './_styles.scss';

const SimpleExamples = () => (
  <div className="icon-separators">
    <IconSeparator label="Hello, World!">
      <FontIcon>thumb_up</FontIcon>
    </IconSeparator>
    <IconSeparator label="Let's go Shopping" iconBefore>
      <FontIcon>shopping_card</FontIcon>
    </IconSeparator>
  </div>
);

export default SimpleExamples;
