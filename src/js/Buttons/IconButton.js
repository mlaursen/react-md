import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FontIcon from '../FontIcons';
import { InkHOC } from '../Inks';
import Tooltip from '../Tooltips';

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
    tooltip: PropTypes.string,
    tooltipClassName: PropTypes.string,
    tooltipPosition: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,

    // Injected from InkHOC
    inks: PropTypes.node.isRequired,
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
      tooltipClassName,
      tooltipPosition,
      disabled,
      inks,
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

    const wrappedButton = React.createElement(href ? 'a' : 'button', btnProps, [inks, displayedChildren]);

    if(tooltip) {
      return (
        <Tooltip text={tooltip} position={tooltipPosition} className={tooltipClassName} selector={btnProps.className}>
          {wrappedButton}
        </Tooltip>
      );
    } else {
      return wrappedButton;
    }
  }
}

export default InkHOC(IconButton);
