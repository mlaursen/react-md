import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import injectInk from '../Inks';

class ListTile extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    className: PropTypes.string,
    children: PropTypes.node,

    // Injected from injectInk
    ink: PropTypes.node.isRequired,
  };

  render() {
    const { component, ink, className, children, ...props } = this.props;
    return React.createElement(component, {
      role: 'button',
      ...props,
      className: classnames('md-list-tile', className),
    }, [ink, children]);
  }
}

export default injectInk(ListTile);
