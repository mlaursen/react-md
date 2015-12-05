import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { rippleComponent } from '../utils/Wrappers';

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.node,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    leftAvatar: PropTypes.node,
    rightIcon: PropTypes.node,
    component: PropTypes.func,
  }

  renderText = () => {
    const { primaryText, secondaryText, leftIcon, leftAvatar, rightIcon } = this.props;
    const tileTitle = <span key="tile-title" className="md-tile-title">{primaryText}</span>;

    if(!leftIcon && !leftAvatar && !rightIcon) {
      return tileTitle;
    }

    const contentClassName = classnames('md-tile-content', {
      'icon-left': !!leftIcon,
      'avatar-left': !!leftAvatar,
      'icon-right': !!rightIcon,
    });
    return (
      <div key="tile-content" className={contentClassName}>
        {tileTitle}
        {secondaryText && <div className="md-tile-secondary-text">{secondaryText}</div>}
      </div>
    );
  }

  renderLeftChildren = () => {
    const { leftIcon, leftAvatar } = this.props;
    if(!leftIcon && !leftAvatar) {
      return null;
    }

    return React.cloneElement(leftIcon || leftAvatar, { key: 'left-children' });
  }

  renderRightChildren = () => {
    return null;
  }

  render() {
    const { component, className, ...props } = this.props;
    return React.createElement(component || 'li', {
      role: 'button',
      className: classnames('md-list-tile', className),
      ...props,
    }, [this.renderLeftChildren(), this.renderText(), this.renderRightChildren()]);
  }
}
export default rippleComponent()(ListItem);
