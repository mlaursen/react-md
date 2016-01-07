import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

export default class ListSubheader extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    primary: PropTypes.bool,
    primaryText: PropTypes.node,
  };

  render() {
    const { className, primaryText, ...props } = this.props;
    return (
      <li className={classnames('md-list-subheader md-subheader', className, { 'md-primary-subheader': isPropEnabled(props, 'primary') })} {...props}>
        {primaryText}
      </li>
    );
  }
}
