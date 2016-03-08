import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { IconButton } from '../Buttons';
import Divider from '../Dividers';

const NavigationDrawerHeader = (props) => {
  const {
    className,
    children,
    persistent,
    title,
    closeDrawer,
    closeIconChildren,
    closeIconClassName,
  } = props;

  let closeButton;
  if(persistent && closeDrawer && (closeIconChildren || closeIconClassName)) {
    closeButton = (
      <IconButton
        className="md-navigation-drawer-btn md-navigation-drawer-toggle"
        onClick={closeDrawer}
        iconClassName={closeIconClassName}
        children={closeIconChildren}
      />
    );
  }
  return (
    <header className={classnames('md-drawer-header', className)}>
      {title && <h3 className="md-title">{title}</h3>}
      {children}
      {closeButton}
      <Divider />
    </header>
  );
};

NavigationDrawerHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  persistent: PropTypes.bool.isRequired,
  title: PropTypes.string,
  closeDrawer: PropTypes.func,
  closeIconClassName: PropTypes.string,
  closeIconChildren: PropTypes.node,
};

export default NavigationDrawerHeader;
