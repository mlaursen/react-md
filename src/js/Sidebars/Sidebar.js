import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    overlay: PropTypes.bool,
    isOpen: PropTypes.bool,
    fixed: PropTypes.bool,
    responsive: PropTypes.bool,
    header: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
    transitionName: PropTypes.string,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,
    onOverlayClick: PropTypes.func,
  };

  static defaultProps = {
    responsive: true,
    transitionName: 'md-overlay',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
  };

  render() {
    const { isOpen, header, overlay, responsive, className, children, onOverlayClick, ...props } = this.props;
    const isOverlayVisible = isOpen && (responsive || overlay);
    return (
      <CSSTransitionGroup
        component="div"
        className={classnames('md-sidebar-container', className, { 'fixed': isPropEnabled(props, 'fixed'), responsive })}
        {...props}
        >
        <nav className={classnames('md-sidebar', { 'active': isOpen })}>
          {header}
          {children}
        </nav>
        {isOverlayVisible &&
          <div className="md-overlay" onClick={onOverlayClick} />
        }
      </CSSTransitionGroup>
    );
  }
}
