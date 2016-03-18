import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { IconButton } from '../Buttons';
import Height from '../Transitions';
import List from './List';
import Ink from '../Inks';

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: props.initiallyOpen };
  }

  static propTypes = {
    primaryText: PropTypes.node,
    secondaryText: PropTypes.node,
    secondaryText2: PropTypes.node,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    leftAvatar: PropTypes.node,
    rightIcon: PropTypes.node,
    rightAvatar: PropTypes.node,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    nestedItems: PropTypes.arrayOf(PropTypes.node),
    initiallyOpen: PropTypes.bool,
    isOpen: PropTypes.bool,
    onExpanderClick: PropTypes.func,
    expandOnClick: PropTypes.bool,
    expanderIconChildren: PropTypes.node,
    expanderIconClassName: PropTypes.string,
    onClick: PropTypes.func,
    primaryAction: PropTypes.func,
    primaryActionNode: PropTypes.node,
    secondaryAction: PropTypes.func,
    secondaryActionNode: PropTypes.node,
  };

  static defaultProps = {
    component: 'div',
    initiallyOpen: false,
    expanderIconChildren: 'keyboard_arrow_down',
    expandOnClick: true,
  };

  renderText = () => {
    const {
      primaryText,
      secondaryText,
      secondaryText2,
      leftIcon,
      leftAvatar,
      rightIcon,
      rightAvatar,
      nestedItems,
    } = this.props;
    if(!primaryText) {
      return null;
    }

    const tileTitle = <div key="tile-title" className="md-tile-primary-text">{primaryText}</div>;

    if(!leftIcon && !leftAvatar && !rightIcon && !rightAvatar && !(nestedItems && nestedItems.length)) {
      return tileTitle;
    }

    const contentClassName = classnames('md-tile-content', {
      'icon-left': leftIcon,
      'avatar-left': leftAvatar,
      'icon-right': rightIcon || (nestedItems && nestedItems.length),
      'avatar-right': rightAvatar,
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
    const { leftIcon, leftAvatar, primaryActionNode } = this.props;
    if(!leftIcon && !leftAvatar && !primaryActionNode) {
      return null;
    }

    return React.cloneElement(primaryActionNode || leftIcon || leftAvatar, { key: 'left-children' });
  };

  renderRightChildren = () => {
    const { rightIcon, rightAvatar, expanderIconChildren, expanderIconClassName, nestedItems, secondaryActionNode } = this.props;
    if(!rightIcon && !rightAvatar && !(nestedItems && nestedItems.length) && !secondaryActionNode) { return null; }

    if(nestedItems && nestedItems.length) {
      const className = classnames('md-list-expander', { 'active': this.isOpen() });
      if(!rightIcon) {
        return (
          <IconButton
            key="toggle"
            onClick={this.toggleNestedItems}
            iconClassName={expanderIconClassName}
            className={className}
            children={expanderIconChildren}
          />
        );
      }

      return React.cloneElement(rightIcon, { key: 'toggle', className });
    }

    return React.cloneElement(rightIcon || rightAvatar || secondaryActionNode, { key: 'right-children' });
  };

  isOpen = () => {
    return typeof this.props.isOpen === 'undefined' ? this.state.isOpen : this.props.isOpen;
  };

  toggleNestedItems = (e) => {
    const { onExpanderClick } = this.props;
    e.stopPropagation();

    if(onExpanderClick) {
      onExpanderClick(e);
    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  };

  handleClick = (e) => {
    const { onClick, nestedItems, expandOnClick, primaryAction, primaryActionNode } = this.props;
    onClick && onClick(e);

    if(expandOnClick && nestedItems) {
      this.toggleNestedItems(e);
    } else if(primaryAction && primaryActionNode) {
      primaryAction(e);
    }
  };

  render() {
    const {
      component,
      className,
      secondaryText,
      secondaryText2,
      leftIcon,
      leftAvatar,
      rightIcon,
      rightAvatar,
      nestedItems,
      expanderIconClassName,
      expanderIconChildren,
      primaryAction,
      primaryActionNode,
      secondaryAction,
      secondaryActionNode,
      ...props,
    } = this.props;

    let content = React.createElement(component, {
      role: 'button',
      ...props,
      onClick: this.handleClick,
      className: classnames('md-list-tile', className, {
        'two-lines': secondaryText,
        'three-lines': !!secondaryText && !!secondaryText2,
        'md-list-avatar': leftAvatar || rightAvatar,
        'controls': (primaryAction && primaryActionNode) || (secondaryAction && secondaryActionNode),
        'controls-left': primaryAction && primaryActionNode,
        'controls-right': (secondaryAction && secondaryActionNode) || !!nestedItems,
      }),
    }, [this.renderLeftChildren(), this.renderText(), this.renderRightChildren()]);

    // If the list does not have controls
    if(!primaryAction && !primaryActionNode && !secondaryAction && !secondaryActionNode) {
      content = <Ink>{content}</Ink>;
    }

    let children;
    if(this.isOpen() && nestedItems && nestedItems.length) {
      children = (
        <Height key="nested-list">
          <List>
            {nestedItems}
          </List>
        </Height>
      );
    }

    return (
      <TransitionGroup component="li">
        {content}
        {children}
      </TransitionGroup>
    );
  }
}
