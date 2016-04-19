import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import IconButton from './IconButton';

/**
 * A `FloatingButton` is an extension of the `IconButton`.
 * A tooltip can be displayed on hover or touch hold if the
 * `tooltipLabel` prop is given.
 *
 * Another name for this button is a `FloatingActionButton` (FAB).
 *
 * Any other props (such as style or event listeners) will also be
 * applied.
 */
export default class FloatingButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * The className to use for rendering the `FontIcon`.
     */
    iconClassName: PropTypes.string,

    /**
     * Any children to use to render the `FontIcon`.
     */
    children: PropTypes.node,

    /**
     * An optional className to apply to the button.
     */
    className: PropTypes.string,

    /**
     * The button type.
     */
    type: PropTypes.string,

    /**
     * Boolean if the button is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional href to convert the button into a link button.
     */
    href: PropTypes.string,

    /**
     * An optional function to call when the button is clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional label to use if you would like a tooltip to display
     * on hover or touch hold.
     */
    tooltipLabel: PropTypes.string,

    /**
     * The position that the tooltip should be displayed relative to
     * the button.
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * An optional amount of delay before the tooltip appears.
     */
    tooltipDelay: PropTypes.number,

    /**
     * Boolean if the floating button is fixed.
     */
    fixed: PropTypes.bool,

    /**
     * Boolean if the floating button should be displayed as the mini
     * version.
     */
    mini: PropTypes.bool,

    /**
     * Boolean if the floating button should be styled with the primary color.
     */
    primary: PropTypes.bool,

    /**
     * Boolean if the floating button should be styled with the secondary color.
     */
    secondary: PropTypes.bool,
  };

  render() {
    const {
      className,
      fixed,
      mini,
      primary,
      secondary,
      children,
      iconClassName,
      ...props,
    } = this.props;
    return (
      <IconButton
        {...props}
        className={classnames('md-floating-btn', className, {
          mini,
          fixed,
          'md-primary': primary,
          'md-secondary': secondary,
        })}
        iconClassName={iconClassName}
      >
        {children}
      </IconButton>
    );
  }
}
