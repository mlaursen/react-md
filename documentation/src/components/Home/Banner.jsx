import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-md/lib/Buttons/Button';

import InlineSVG from 'components/InlineSVG';
import logo from './logo.svg';

const Banner = () => (
  <header className="home__banner">
    <h1 className="md-display-2">react-md</h1>
    <InlineSVG src={logo} className="home__logo" />
    <Button
      raised
      secondary
      label="View Demo"
      type={null}
      to="/components"
      component={Link}
    />
  </header>
);

export default Banner;
