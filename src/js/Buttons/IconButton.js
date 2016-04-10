import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FontIcon from '../FontIcons';
import injectInk from '../Inks';
import injectTooltip from '../Tooltips';

class IconButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    iconClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    href: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,

    // Injected from injectInk
    ink: PropTypes.node,

    // Inject from injectTooltip
    tooltip: PropTypes.node,

    // Consumed from injectTooltip
    tooltipLabel: PropTypes.string,
    tooltipPosition: PropTypes.string,
    tooltipDelay: PropTypes.number,
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
