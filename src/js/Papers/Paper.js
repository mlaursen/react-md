import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import between from '../utils/PropTypes/between';

/**
 * The `Paper` component is a simple wrappper that adds box-shadow.
 *
 * You can also use the scss mixin instead of paper.
 *
 * ```scss
 * @include md-box-shadow(5);
 * ```
 */
export default class Paper extends PureComponent {
  static propTypes = {
    /**
     * The component to render the paper as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The depth of the paper. This should be a number between 0 - 5. If
     * the depth is 0, it will raise to a depth of 3 on hover.
     */
    zDepth: between(PropTypes.number.isRequired, 0, 5),

    /**
     * Any children to display in the paper.
     */
    children: PropTypes.node,

    /**
     * Boolean if the paper should raise to the `zDepth` of `3` on hover when the initial
     * `zDepth` is `0`.
     */
    raiseOnHover: PropTypes.bool,
  };

  static defaultProps = {
    zDepth: 1,
    component: 'div',
  };

  render() {
    const { component: Component, zDepth, className, raiseOnHover, ...props } = this.props;

    return (
      <Component
        {...props}
        className={cn(`md-paper md-paper--${zDepth}`, {
          'md-paper--0-hover': zDepth === 0 && raiseOnHover,
        }, className)}
      />
    );
  }
}
