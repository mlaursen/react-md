import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import IconButton from '../Buttons/IconButton';

export default class NavigationDrawerToolbar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    temporary: PropTypes.bool,
    persistent: PropTypes.bool,
    openDrawer: PropTypes.func,
    menuIconChildren: PropTypes.node,
    menuIconClassName: PropTypes.string,
  };

  render() {
    const {
      style,
      className,
      children,
      title,
      temporary,
      isOpen,
      persistent,
      openDrawer,
      menuIconChildren,
      menuIconClassName,
    } = this.props;

    let menuBtn;
    if(temporary || (persistent && !isOpen)) {
      menuBtn = (
        <IconButton
          key="toggle"
          onClick={openDrawer}
          children={menuIconChildren}
          iconClassName={menuIconClassName}
        />
      );
    }

    return (
      <header
        className={classnames('md-navigation-drawer-toolbar', className)}
        style={style}
      >
        {menuBtn}
        {title && <h3 className="md-title">{title}</h3>}
        {children}
      </header>
    );
  }
}
