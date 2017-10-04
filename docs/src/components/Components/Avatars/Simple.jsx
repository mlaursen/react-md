/* eslint-disable react/prop-types */
import React from 'react';
import { Avatar, IconSeparator, FontIcon, SVGIcon } from 'react-md';

import { randomImage } from 'utils/random';
import done from 'icons/done.svg';

const Item = ({ label, children }) => (
  <IconSeparator label={label} iconBefore component="li" className="md-cell md-cell--12">
    {children}
  </IconSeparator>
);

const Simple = () => (
  <ul className="md-list-unstyled md-grid avatars__examples">
    <Item label="An Avatar with a random image from http://unsplash.it">
      <Avatar src={randomImage()} role="presentation" />
    </Item>
    <Item label="An Avatar with a FontAwesome icon.">
      <Avatar icon={<FontIcon iconClassName="fa fa-rocket" />} />
    </Item>
    <Item label="An Avatar using an SVG Icon">
      <Avatar icon={<SVGIcon use={done.url} />} suffix="light-green" />
    </Item>
    <Item label="An Avatar using a letter and the default color.">
      <Avatar>M</Avatar>
    </Item>
    <Item label="An Avatar using a letter and a random color.">
      <Avatar random>O</Avatar>
    </Item>
  </ul>
);

export default Simple;
