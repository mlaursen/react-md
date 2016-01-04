import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
  }

  render() {
    const { className, children, ...props } = this.props;
    const fullClassName = classnames('md-toolbar', className, {
      'md-toolbar-primary': isPropEnabled(props, 'primary'),
      'md-toolbar-secondary': isPropEnabled(props, 'secondary'),
    });
    return (
      <header className={fullClassName} {...props}>
        {children}
      </header>
    );
  }
}
