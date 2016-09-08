import React, { PureComponent, PropTypes } from 'react';

import FontIcon from '../FontIcons';
import injectTooltip from '../Tooltips';
import Button from './Button';
import deprecated from './_deprecated';

/**
 * The `IconButton` component automatically includes ink and a tooltip.
 * The tooltip will only be included if the `tooltipLabel` prop is given.
 *
 * Any other props (such as style or event listeners) will also be
 * applied.
 */
class IconButton extends PureComponent {
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
     * Boolean if the IconButton is floating
    floating: PropTypes.bool,

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

    // Inject from injectTooltip
    tooltip: PropTypes.node,
    floating: PropTypes.bool,

    _deprecated: deprecated('icon'),
  };

  static defaultProps = {
    type: 'button',
  };

  render() {
    const {
      iconClassName,
      children,
      tooltip,
      floating,
      ...props,
    } = this.props;
    delete props.tooltipLabel;
    delete props.tooltipPosition;

    return (
      <Button {...props} icon={!floating} floating={floating}>
        {tooltip}
        <FontIcon iconClassName={iconClassName}>{children}</FontIcon>
      </Button>
    );
  }
}

export default injectTooltip(IconButton);
