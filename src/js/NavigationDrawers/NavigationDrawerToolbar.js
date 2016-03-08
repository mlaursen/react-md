import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { IconButton } from '../Buttons';

const NavigationDrawerToolbar = (props) => {
  const {
    className,
    persistent,
    isOpen,
    openDrawer,
    menuIconClassName,
    menuIconChildren,
    title,
    children,
  } = props;

  let menuButton;
  if(persistent && !isOpen) {
    menuButton = (
      <IconButton
        className="md-navigation-drawer-btn"
        onClick={openDrawer}
        iconClassName={menuIconClassName}
        children={menuIconChildren}
      />
    );
  }
  return (
    <header className={classnames('md-navigation-drawer-toolbar', className)}>
      {menuButton}
      {title && <h3 className="md-title">{title}</h3>}
      {children}
    </header>
  );
};

NavigationDrawerToolbar.propTypes = {
  className: PropTypes.string,
  persistent: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func,
  menuIconClassName: PropTypes.string,
  menuIconChildren: PropTypes.node,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default NavigationDrawerToolbar;
