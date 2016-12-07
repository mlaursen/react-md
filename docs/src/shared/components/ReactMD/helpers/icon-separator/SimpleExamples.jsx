import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';

import './_icon-separators.scss';

const SimpleExamples = () => (
  <div className="separator-examples">
    <IconSeparator label="Hello, World!">
      <FontIcon>thumb_up</FontIcon>
    </IconSeparator>
    <IconSeparator label="Let's go Shopping" iconBefore>
      <FontIcon>shopping_card</FontIcon>
    </IconSeparator>
  </div>
);

export default SimpleExamples;
