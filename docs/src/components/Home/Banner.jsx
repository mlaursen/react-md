import React from 'react';
import { Link } from 'react-router-dom';
import { Button, bem } from 'react-md';

import { ROOT_PATH } from 'constants/application';
import InlineSVG from 'components/InlineSVG';
import logo from '!!raw-loader!./logo.svg';

const base = 'home';

const Banner = () => (
  <header className={bem(base, 'banner')}>
    <h1 className="md-display-2">react-md</h1>
    <InlineSVG src={logo} className={bem(base, 'logo')} />
    <Button
      raised
      secondary
      type={null}
      to={`${ROOT_PATH}components`}
      component={Link}
    >
      View Demo
    </Button>
  </header>
);

export default Banner;
