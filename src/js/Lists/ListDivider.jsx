import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

export default class ListDivider extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    inset: PropTypes.bool,
  }

  render() {
    const { className, ...props } = this.props;
    return <hr role="divider" className={classnames('md-divider', className, { 'inset': isPropEnabled(props, 'inset') })} {...props} />;
  }
}
