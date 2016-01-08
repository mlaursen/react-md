import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    primaryText: PropTypes.node.isRequired,
    secondaryText: PropTypes.node,
    secondaryText2: PropTypes.node,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    leftAvatar: PropTypes.node,
    rightIcon: PropTypes.node,
    rightAvatar: PropTypes.node,
    component: PropTypes.func,
  };

  renderText = () => {
    const { primaryText, secondaryText, secondaryText2, leftIcon, leftAvatar, rightIcon, rightAvatar } = this.props;
    const tileTitle = <div key="tile-title" className="md-tile-primary-text">{primaryText}</div>;

    if(!leftIcon && !leftAvatar && !rightIcon && !rightAvatar) {
      return tileTitle;
    }

    const contentClassName = classnames('md-tile-content', {
      'icon-left': !!leftIcon || !!leftAvatar,
      'icon-right': !!rightIcon || !!rightAvatar,
    });
    return (
      <div key="tile-content" className={contentClassName}>
        {tileTitle}
        {secondaryText && <div className="md-tile-secondary-text">{secondaryText}</div>}
        {secondaryText2 && <div className="md-tile-secondary-text">{secondaryText2}</div>}
      </div>
    );
  };

  renderLeftChildren = () => {
    const { leftIcon, leftAvatar } = this.props;
    if(!leftIcon && !leftAvatar) {
      return null;
    }

    return React.cloneElement(leftIcon || leftAvatar, { key: 'left-children' });
  };

  renderRightChildren = () => {
    const { rightIcon, rightAvatar } = this.props;
    if(!rightIcon && !rightAvatar) { return null; }

    return React.cloneElement(rightIcon || rightAvatar, { key: 'right-children' });
  };

  render() {
    const { component, className, secondaryText, secondaryText2, leftIcon, leftAvatar, rightIcon, rightAvatar, ...props } = this.props;
    return React.createElement(component || 'li', {
      role: 'button',
      className: classnames('md-list-tile', className, {
        'md-list-3-lines': !!secondaryText && !!secondaryText2,
        'md-list-avatar': leftIcon || leftAvatar || rightIcon || rightAvatar,
      }),
      tabIndex: 0,
      onFocus: this.handleFocus,
      ...props,
    }, [this.renderLeftChildren(), this.renderText(), this.renderRightChildren()]);
  }
}
