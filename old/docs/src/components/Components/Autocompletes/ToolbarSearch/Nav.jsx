import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

const Nav = ({ searching, onClick, ...props }) => {
  const icon = searching ? 'arrow_back' : 'search';

  return <Button icon onClick={searching ? onClick : null} {...props}>{icon}</Button>;
};

Nav.propTypes = {
  searching: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Nav;
