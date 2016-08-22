import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';

const FontIconExamples = () => (
  <div>
    <p>FontIcons from Material Icons</p>
    <FontIcon>home</FontIcon>
    <FontIcon>favorite</FontIcon>
    <p>FontIcons from FontAwesome</p>
    <FontIcon iconClassName="fa fa-star-o" />
    <FontIcon iconClassName="fa fa-book" />
  </div>
);

export default FontIconExamples;
