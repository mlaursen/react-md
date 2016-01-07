import React from 'react';
import * as components from './components';

import { FontIcon, Avatar } from 'react-md';

export const githubHref = 'https://github.com/mlaursen/react-md';

export const componentLinks = Object.keys(components).map(k => {
  const c = components[k];
  if(!c.name) { return; }

  const name = c.name.replace('Doc', '').split(/(?=[A-Z])/);

  return {
    link: name.map(c => c.toLowerCase()).join('-'),
    label: name.join(' '),
  };
}).filter(c => !!c);

export const mainLinks = [{
  link: '',
  primaryText: 'Home',
  leftIcon: <FontIcon>home</FontIcon>,
}, {
  link: 'sassdoc',
  primaryText: 'SASS Doc',
  leftAvatar: <Avatar src="/imgs/sass-icon.png" alt="SASS Icon" />,
}];
