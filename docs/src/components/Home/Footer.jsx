import React from 'react';
import PropTypes from 'prop-types';

import gettingStarted from './getting-started.svg';
import customization from './customization.svg';
import components from './components.svg';
import SVGCard from './SVGCard';

const Footer = ({ style }) => (
  <footer style={style} className="md-grid home__footer">
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
      title="Customization"
    />
  </footer>
);

Footer.propTypes = {
  style: PropTypes.object,
};

export default Footer;
