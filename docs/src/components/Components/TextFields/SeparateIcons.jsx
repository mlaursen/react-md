import React from 'react';
import {
  FontIcon,
  SVGIcon,
  TextField,
} from 'react-md';

import invisible from 'icons/visibility_off.svg';
import visible from 'icons/visibility.svg';
import locked from 'icons/lock.svg';
import unlocked from 'icons/lock_open.svg';

const SeparateIcons = () => (
  <div className="md-grid text-fields">
    <TextField
      className="md-cell md-cell--bottom"
      id="password-field-two-icons-with-font-icon"
      label="Password with FontIcon"
      passwordIcon={{
        invisible: <FontIcon>visibility_off</FontIcon>,
        visible: <FontIcon>visibility</FontIcon>,
      }}
      type="password"
    />
    <TextField
      className="md-cell md-cell--bottom"
      id="password-field-two-icons-with-svg-icon"
      label="Password with SVG"
      passwordIcon={{
        invisible: <SVGIcon use={invisible.url} />,
        visible: <SVGIcon use={visible.url} />,
      }}
      type="password"
    />
    <TextField
      className="md-cell md-cell--bottom"
      id="password-field-two-icons-with-alt-svg-icon"
      label="Password with Alternate SVG"
      passwordIcon={{
        invisible: <SVGIcon use={locked.url} />,
        visible: <SVGIcon use={unlocked.url} />,
      }}
      type="password"
    />
  </div>
);
export default SeparateIcons;
