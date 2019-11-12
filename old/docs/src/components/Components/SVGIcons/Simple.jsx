/* eslint-disable max-len */
import React from 'react';
import { SVGIcon } from 'react-md';

const MenuIcon = props => (
  <SVGIcon {...props}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </SVGIcon>
);

const FavoriteIcon = props => (
  <SVGIcon {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </SVGIcon>
);

const Simple = () => (
  <div className="icons__examples">
    <MenuIcon />
    <FavoriteIcon />
    <MenuIcon primary />
    <FavoriteIcon secondary />
    <MenuIcon disabled />
    <FavoriteIcon error />
    <MenuIcon size={48} />
    <FavoriteIcon size={32} error />
  </div>
);

export default Simple;
