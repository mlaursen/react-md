import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class Subheader extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    primary: PropTypes.bool,
    inset: PropTypes.bool,
    menu: PropTypes.bool,
    menuComponent: PropTypes.string,
    primaryText: PropTypes.string.isRequired,
  };

  static defaultProps = {
    menuComponent: 'h5',
  };

  render() {
    const { menu, menuComponent, inset, primary, primaryText, className, ...props } = this.props;
    return React.createElement(menu ? menuComponent : 'li', {
      ...props,
      className: classnames('md-subheader', className, {
        inset,
        'md-primary': primary,
      }),
    }, primaryText);
  }
}
