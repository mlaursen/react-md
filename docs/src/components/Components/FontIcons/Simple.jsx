import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';

import './_styles.scss';

const Simple = () => (
  <div className="icons__examples">
    <h4 className="md-cell md-cell--12">Font icons from Material Icons</h4>
    <FontIcon>home</FontIcon>
    <FontIcon>favorite</FontIcon>
    <h4 className="md-cell md-cell--12">Font icons from FontAwesome</h4>
    <FontIcon iconClassName="fa fa-star-o" />
    <FontIcon iconClassName="fa fa-book" />
  </div>
);

export default Simple;
