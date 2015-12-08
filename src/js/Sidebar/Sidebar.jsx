import React, { Component, PropTypes } from 'react';
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
      component: PropTypes.func,
      primaryText: PropTypes.string,
    })),
    header: PropTypes.node,
    children: PropTypes.node,
  }

  static defaultProps = {
    responsive: true,
  }

  render() {
    const { isOpen, header, overlay, items, responsive, children, ...props } = this.props;
    return (
      <div className={classnames('md-sidebar-container', { 'fixed': isPropEnabled(props, 'fixed'), 'md-sidebar-responsive': responsive })} {...props}>
        <nav className={classnames('md-sidebar', { 'active': isOpen })}>
          {header}
          <List>
            {items.map(item => {
              if(item.divider) {
                return <ListDivider {...item} />;
              } else if(item.subheader) {
                return <ListSubheader {...item} />;
              } else {
                return <ListItem {...item} />;
              }
            })}
          </List>
        </nav>
      </div>
    );
  }
}
