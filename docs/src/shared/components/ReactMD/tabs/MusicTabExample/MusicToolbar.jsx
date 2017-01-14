import React, { PropTypes } from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';

const MusicToolbar = ({ onCloseClick }) => (
  <Toolbar
    colored
    nav={<Button icon onClick={onCloseClick}>keyboard_arrow_left</Button>}
    title="Metal"
    actions={<Button icon>search</Button>}
  />
);

MusicToolbar.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
};

export default MusicToolbar;
