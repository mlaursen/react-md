import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Button from './Button';
import FontIcon from '../FontIcon';

export default class FloatingButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    children: PropTypes.string,
  };

  render() {
    const { iconClassName, children, ...props } = this.props;
    return (
      <Button floating {...props}>
        <FontIcon iconClassName={iconClassName} children={children} />
      </Button>
    );
  }
}
