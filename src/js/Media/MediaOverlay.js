import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `MediaOverlay` component is just a very simple wrapper that adds the
 * `.md-media-overlay` class name to a div. The overlay will be positioned
 * at the bottom of the `Media` by default.
 */
export default class MediaOverlay extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the overlay.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the overlay.
     */
    className: PropTypes.string,

    /**
     * Any children to display in the overlay. This is _normally_ a `CardTitle` component
     * or some buttons.
     */
    children: PropTypes.node,

    /**
     * The component to be rendered as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
  };

  static defaultProps = {
    component: 'div',
  };

  render() {
    const { className, component: Component, ...props } = this.props;
    return <Component className={cn('md-media-overlay', className)} {...props} />;
  }
}
