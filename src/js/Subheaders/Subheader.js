import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `Subheader` component is generally used inside of lists or menus.
 */
export default class Subheader extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the subheader.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the subheader.
     */
    className: PropTypes.string,

    /**
     * Boolean if the subheader should be styled with the primary color.
     */
    primary: PropTypes.bool,

    /**
     * Boolean if the subheader is inset in the list. This will add additional
     * spacing to align the subheader.
     */
    inset: PropTypes.bool,

    /**
     * The primary text to use in the subheader.
     */
    primaryText: PropTypes.node.isRequired,

    /**
     * Any optional children to display after the `primaryText`. This prop is
     * unrecommended.
     */
    children: PropTypes.node,

    /**
     * The component to render the Subheader as.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  };

  static defaultProps = {
    component: 'li',
  };

  render() {
    const {
      component: Component,
      inset,
      primary,
      primaryText,
      className,
      children,
      ...props
    } = this.props;

    return (
      <Component
        {...props}
        className={cn('md-subheader', {
          'md-text--secondary': !primary,
          'md-text--theme-primary': primary,
          'md-list-item--inset': inset,
        }, className)}
      >
        {primaryText}
        {children}
      </Component>
    );
  }
}
