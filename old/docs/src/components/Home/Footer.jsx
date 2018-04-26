import React from 'react';
import PropTypes from 'prop-types';
import { GridList, bem } from 'react-md';

import gettingStarted from './getting-started.svg';
import customization from './customization.svg';
import components from './components.svg';
import SVGCard from './SVGCard';

const base = 'home';

const Footer = ({ style }) => (
  <GridList component="footer" style={style} className={bem(base, 'footer')} cellClassName={bem(base, 'svg-card')}>
    <SVGCard
      to="getting-started"
      src={gettingStarted}
      alt="A Mac and a Macbook with design mock ups."
      title="Getting Started"
    />
    <SVGCard
      to="customization"
      src={customization}
      alt="A chemistry set with material design colors flowing into a text editor."
      title="Customization"
    />
    <SVGCard
      to="components"
      src={components}
      alt="A chemistry set with material design colors flowing into a text editor."
      title="Components"
    />
  </GridList>
);

Footer.propTypes = {
  style: PropTypes.object,
};

export default Footer;
