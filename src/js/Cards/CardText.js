import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class CardText extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    component: PropTypes.string,
  };

  static defaultProps = {
    component: 'section',
  };

  render() {
    const { component, className, children, ...props } = this.props;
    return React.createElement(component, {
      className: classnames('md-card-text', className),
      ...props,
    }, children);
  }
}
