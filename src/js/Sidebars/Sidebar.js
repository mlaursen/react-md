import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import Divider from '..//Dividers';
import { List, ListItem, ListSubheader } from '../Lists';
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
    align: PropTypes.oneOf(['left', 'right']),
    items: PropTypes.arrayOf(PropTypes.shape({
      divider: PropTypes.bool,
      subheader: PropTypes.bool,
      primaryText: PropTypes.string,
    })),
  };

  static defaultProps = {
    align: 'left',
    responsive: true,
    transitionName: 'md-overlay',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
  };

  itemToComponent = ({ divider, subheader, ...itemProps }) => {
    let component = ListItem;
    if(divider) {
      component = Divider;
    } else if(subheader) {
      component = ListSubheader;
    }

    return React.createElement(component, itemProps);
  };

  render() {
    const { isOpen, header, overlay, responsive, className, children, onOverlayClick, align, items, ...props } = this.props;
    const isOverlayVisible = isOpen && (responsive || overlay);

    let listItems;
    if(items) {
      listItems = (
        <List>
          {items.map(this.itemToComponent)}
        </List>
      );
    }
    return (
      <CSSTransitionGroup
        component="div"
        className={classnames('md-sidebar-container', `md-sidebar-${align}`, className, { 'fixed': isPropEnabled(props, 'fixed'), responsive })}
        {...props}
        >
        <nav className={classnames('md-sidebar', { 'active': isOpen })}>
          {header}
          {listItems}
          {children}
        </nav>
        {isOverlayVisible &&
          <div className="md-overlay" onClick={onOverlayClick} />
        }
      </CSSTransitionGroup>
    );
  }
}
