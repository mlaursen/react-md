import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import SVGIcon from 'react-md/lib/SVGIcons';
import TextField from 'react-md/lib/TextFields';

import removeRedEye from 'icons/remove_red_eye.svg';
import phone from 'icons/phone.svg';

import './_icon-styles.scss';

const InlineIcons = () => (
  <div className="md-grid text-fields">
    <div className="md-cell text-fields__blocked-phones">
      <TextField
        id="phone-number-with-icon-left"
        label="Phone"
        type="tel"
        leftIcon={<FontIcon>phone</FontIcon>}
        size={10}
        fullWidth={false}
      />
      <TextField
        id="phone-number-with-icon-right"
        label="Phone"
        type="tel"
        rightIcon={<FontIcon>phone</FontIcon>}
        size={10}
        fullWidth={false}
      />
    </div>
    <div className="md-cell text-fields__blocked-phones">
      <TextField
        id="phone-number-with-svg-icon-left"
        label="Phone"
        type="tel"
        leftIcon={<SVGIcon use={phone.url} />}
        size={10}
        fullWidth={false}
      />
      <TextField
        id="phone-number-with-svg-icon-right"
        label="Phone"
        type="tel"
        rightIcon={<SVGIcon use={phone.url} />}
        size={10}
        fullWidth={false}
      />
    </div>
    <TextField
      id="text-with-close-button"
      label="Some text"
      inlineIndicator={<Button icon className="text-fields__inline-btn">clear</Button>}
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="text-field-with-svg-password"
      label="Password with SVG"
      type="password"
      passwordIcon={<SVGIcon use={removeRedEye.url} />}
      className="md-cell md-cell--bottom"
    />
  </div>
);
export default InlineIcons;
