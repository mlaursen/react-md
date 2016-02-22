import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils';
import { TAB } from '../constants/keyCodes';
import FontIcon from '../FontIcons';
import Ink from '../Inks';
import Tooltip from '..//Tooltips';

export default class IconButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { focused: false };
  }

  static propTypes = {
    iconClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    tooltip: PropTypes.string,
    tooltipClassName: PropTypes.string,
    tooltipPosition: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
    onClickInkMouseDown: PropTypes.bool,
  };

  static defaultProps = {
    type: 'button',
    onClickInkMouseDown: false,
  };

  handleKeyUp = (e) => {
    if(this.props.onKeyUp) { this.props.onKeyUp(e); }

    if((e.keyCode || e.which) === TAB) {
      this.setState({ focused: true });
    }
  };

  handleClick = (e) => {
    this.props.onClick && this.props.onClick(e);
    this.setState({ focused: false });
  };

  handleBlur = (e) => {
    if(this.props.onBlur) { this.props.onBlur(e); }

    this.setState({ focused: false });
  };

  render() {
    const { iconClassName, children, className, href, type, onClickInkMouseDown, tooltip, tooltipClassName, tooltipPosition, ...props } = this.props;
    let btnProps = {
      ...props,
      onClick: this.handleClick,
      onKeyUp: this.handleKeyUp,
      onBlur: this.handleBlur,
      className: classnames('md-btn', 'md-icon-btn', className),
    };

    if(onClickInkMouseDown) {
      btnProps.onClick = null;
    }

    if(href) {
      btnProps.href = href;
    } else {
      btnProps.type = type;
    }

    const button = React.createElement(href ? 'a' : 'button', btnProps, [
      <Ink key="ink" disabled={isPropEnabled(props, 'disabled')} onClick={onClickInkMouseDown ? this.handleClick : null} focused={this.state.focused} />,
      children && children.type && children.type === FontIcon ? children : <FontIcon key="icon" iconClassName={iconClassName}>{children}</FontIcon>,
    ]);
    if(tooltip) {
      return (
        <Tooltip text={tooltip} position={tooltipPosition} className={tooltipClassName}>
          {button}
        </Tooltip>
      );
    } else {
      return button;
    }
  }
}
