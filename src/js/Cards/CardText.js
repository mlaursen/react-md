import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

/**
 * The `CardText` component is a simple wrapper for text or any content in a `Card`.
 * It really just adds correct padding and font color.
 */
export default class CardText extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

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
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object,
    ]).isRequired,

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
    const {
      component: Component,
      className,
      expandable, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return <Component {...props} className={cn('md-card-text', className)} />;
  }
}
