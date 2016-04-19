import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FontIcon from '../FontIcons';
import injectInk from '../Inks';
import injectTooltip from '../Tooltips';

/**
 * The `IconButton` component automatically includes ink and a tooltip.
 * The tooltip will only be included if the `tooltipLabel` prop is given.
 *
 * Any other props (such as style or event listeners) will also be
 * applied.
 */
class IconButton extends Component {
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

    // Injected from injectInk
    ink: PropTypes.node,

    // Inject from injectTooltip
    tooltip: PropTypes.node,
  };

  static defaultProps = {
    type: 'button',
  };

  render() {
    const {
      iconClassName,
      children,
      className,
      href,
      type,
      tooltip,
      disabled,
      ink,
      ...props,
    } = this.props;

    const btnProps = {
      ...props,
      disabled,
      className: classnames('md-btn md-icon-btn', className),
    };

    if(href) {
      btnProps.href = href;
    } else {
      btnProps.type = type;
    }

    let displayedChildren = children;
    if(!(children && children.type && children.type === FontIcon)) {
      displayedChildren = <FontIcon key="icon" iconClassName={iconClassName}>{children}</FontIcon>;
    }

    return React.createElement(href ? 'a' : 'button', btnProps, [ink, displayedChildren, tooltip]);
  }
}

export default injectTooltip(injectInk(IconButton));
