import React from 'react';
import * as components from './components';

import { FontIcon, Avatar } from '../../src/js';

export const componentLinks = Object.keys(components).map(k => {
  const c = components[k];
  if(!c.name) {
    return;
  }

  const name = c.name.replace('Doc', '').split(/(?=[A-Z])/);

  return {
    link: name.map(c => c.toLowerCase()).join('-'),
    label: name.join(' '),
  };
}).filter(c => !!c);

export const OutsideLink = ({ children, className, ...props }) => (
  <a href="sassdoc" className={`md-list-tile ${className}`} {...props}>
    {children}
  </a>
);


export const mainLinks = [{
  link: '',
  label: 'Home',
  leftIcon: <FontIcon>home</FontIcon>,
}];

export const sublinks = [{
  component: OutsideLink,
  primaryText: 'SASS Doc',
  key: 'sassdoc',
  leftIcon: <Avatar src="http://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png" alt="Sass icon" />,
}, {
  divider: true,
  key: 'main-divider',
}, {
  subheader: true,
  primaryText: 'Components',
  key: components,
}];
