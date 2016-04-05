import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { InkHOC } from '../Inks';

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
  };

  render() {
    const { children, checked, disabled, type, ...props } = this.props;
    return (
      <div className={classnames(`md-${type}`, { 'active': checked, disabled })} {...props}>
        {children}
      </div>
    );
  }
}

export default InkHOC(InkedControl);
