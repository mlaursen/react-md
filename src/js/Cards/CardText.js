import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * The `CardText` component is a simple wrapper for text or any content in a `Card`.
 * It really just adds correct padding and font color.
 */
export default class CardText extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The children to display.
     */
    children: PropTypes.node,

    /**
     * The component to render as.
     */
    component: PropTypes.string,

    /**
     * Boolean if this component should be expandable when there is a `CardExpander`
     * above it in the `Card`.
     */
    expandable: PropTypes.bool,
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
