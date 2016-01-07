import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { List, ListItem, ListDivider, ListSubheader } from '../Lists';
import { isPropEnabled } from '../utils/PropUtils';

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
    items: PropTypes.arrayOf(PropTypes.shape({
      divider: PropTypes.bool,
      subheader: PropTypes.bool,
      component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
      ]),
      primaryText: PropTypes.string,
    })),
    header: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
    transitionName: PropTypes.string,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,
  };

  static defaultProps = {
    responsive: true,
    transitionName: 'md-overlay',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
  };

  render() {
    const { isOpen, header, overlay, items, responsive, className, children, ...props } = this.props;
    const isOverlayVisible = isOpen && (responsive || overlay);
    return (
      <CSSTransitionGroup
        component="div"
        className={classnames('md-sidebar-container', className, { 'fixed': isPropEnabled(props, 'fixed'), 'md-sidebar-responsive': responsive })}
        {...props}
        >
        <nav className={classnames('md-sidebar', { 'active': isOpen })}>
          {header}
          {items &&
          <List>
            {items.map(item => {
              if(item.divider) {
                return <ListDivider {...item} />;
              } else if(item.subheader) {
                return <ListSubheader {...item} />;
              } else if(item.textField) {
                return <li className="md-list-item" key={item.key}>{item.component}</li>;
              } else {
                return <ListItem {...item} />;
              }
            })}
          </List>
          }
          {children}
        </nav>
        {isOverlayVisible &&
          <div className="md-overlay" />
        }
      </CSSTransitionGroup>
    );
  }
}
