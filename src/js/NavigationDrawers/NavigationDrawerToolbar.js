import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { IconButton } from '../Buttons';

const NavigationDrawerToolbar = (props) => {
  const {
    className,
    isOpen,
    temporary,
    openDrawer,
    menuIconClassName,
    menuIconChildren,
    title,
    children,
  } = props;

  return (
    <header className={classnames('md-navigation-drawer-toolbar', className)}>
      <IconButton
        className={classnames('md-navigation-drawer-btn', { 'hidden': isOpen && !temporary })}
        onClick={openDrawer}
        iconClassName={menuIconClassName}
        children={menuIconChildren}
      />
      {title && <h3 className="md-title">{title}</h3>}
      {children}
    </header>
  );
};

NavigationDrawerToolbar.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  temporary: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func,
  menuIconClassName: PropTypes.string,
  menuIconChildren: PropTypes.node,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default NavigationDrawerToolbar;
