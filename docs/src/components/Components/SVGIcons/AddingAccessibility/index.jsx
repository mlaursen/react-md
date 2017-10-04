/* eslint-disable react/prop-types */
import React from 'react';
import { SVGIcon } from 'react-md';

import './_styles.scss';

import alarm from 'icons/alarm.svg';
import twitter from 'icons/twitter.svg';

const MenuIcon = ({ children, ...props }) => (
  <SVGIcon {...props}>
    {children}
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </SVGIcon>
);

const TwitterIcon = props => (
  <SVGIcon
    {...props}
    use={twitter.url}
    viewBox={twitter.viewBox}
    size={48}
    className="twitter-logo"
  />
);

const AddingAccessibility = () => (
  <div>
    <h4>Inline SVGs</h4>
    <div className="icons__examples">
      <MenuIcon aria-labelledby="menu-icon-inline-title menu-icon-inline-desc">
        <title id="menu-icon-inline-title">Menu</title>
        <desc id="menu-icon-inline-desc">This is a menu icon.</desc>
      </MenuIcon>
      <MenuIcon
        aria-labelledby="menu-icon-prop-title menu-icon-prop-desc"
        title="menu"
        desc="This is a menu icon."
      />
    </div>
    <h4>External SVGs</h4>
    <div className="icons__examples">
      <SVGIcon use={alarm.url} title="Alarm" desc="An alarm clock." />
    </div>
    <h4>External SVGs with title</h4>
    <div className="icons__examples">
      <TwitterIcon titleAttr="Twitter Logo" />
    </div>
    <h4>In Links</h4>
    <a href="//twitter.com" className="link link--centered twitter-link">
      <TwitterIcon role="presentation" />
      Twitter
    </a>
    <a href="//twitter.com" className="link twitter-link">
      <TwitterIcon titleAttr="Twitter Logo" />
    </a>
  </div>
);
export default AddingAccessibility;
