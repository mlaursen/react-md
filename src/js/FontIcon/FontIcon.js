import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class FontIcon extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    iconClassName: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    iconClassName: 'material-icons',
  };

  render() {
    const { iconClassName, className, children, ...props } = this.props;
    return <i className={classnames('md-icon', iconClassName, className)} {...props}>{children}</i>;
  }
}
