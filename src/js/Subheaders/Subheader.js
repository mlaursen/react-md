import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class Subheader extends Component {
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
    primary: PropTypes.bool,
    inset: PropTypes.bool,
    primaryText: PropTypes.string.isRequired,
  };

  static defaultProps = {
    component: 'li',
  };

  render() {
    const { component, inset, primary, primaryText, className, ...props } = this.props;
    return React.createElement(component, {
      ...props,
      className: classnames('md-subheader', className, {
        inset,
        'md-primary': primary,
      }),
    }, primaryText);
  }
}
