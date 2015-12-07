import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { List, ListItem, ListDivider } from '../Lists';
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
      component: PropTypes.func,
      primaryText: PropTypes.string.isRequired,
    })),
    header: PropTypes.node,
  }

  static defaultProps = {
    responsive: true,
  }

  render() {
    const { isOpen, header, overlay, items, responsive, ...props } = this.props;
    return (
      <div className={classnames('md-sidebar-container', { 'fixed': isPropEnabled(props, 'fixed'), 'md-sidebar-responsive': responsive })} {...props}>
        <nav className={classnames('md-sidebar', { 'active': isOpen })}>
          {header}
          <List>
            {items.map(item => item.divider ? <ListDivider {...item} /> : <ListItem {...item} />)}
          </List>
        </nav>
      </div>
    );
  }
}
