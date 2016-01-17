import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils';
import Button from './Button';
import FontIcon from '../FontIcons';

export default class FloatingButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    children: PropTypes.string,
    fixed: PropTypes.bool,
  };

  render() {
    const { iconClassName, children, className, ...props } = this.props;
    return (
      <Button floating {...props} className={classnames(className, { 'fixed': isPropEnabled(props, 'fixed') })}>
        <FontIcon iconClassName={iconClassName} children={children} />
      </Button>
    );
  }
}
