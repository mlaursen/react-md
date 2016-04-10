import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import injectInk from '../Inks';

class InkedControl extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,

    // Injected from injectInk
    ink: PropTypes.node,
  };

  render() {
    const { children, checked, disabled, type, ink, ...props } = this.props;
    return (
      <div className={classnames(`md-${type}`, { 'active': checked, disabled })} {...props}>
        {ink}
        {children}
      </div>
    );
  }
}

export default injectInk(InkedControl);
