import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { IconButton } from '../Buttons';
import Height from '../Transitions';
import List from './List';
import ListItemText from './ListItemText';
import Ink from '../Inks';

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: props.initiallyOpen, hover: false };
  }

  static propTypes = {
    primaryText: PropTypes.node,
    secondaryText: PropTypes.node,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
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
    disabled: PropTypes.bool,
    threeLines: PropTypes.bool,
  };

  static defaultProps = {
    component: 'div',
    initiallyOpen: false,
    expanderIconChildren: 'keyboard_arrow_down',
    expandOnClick: true,
  };

  renderLeftChildren = () => {
    const { leftIcon, leftAvatar } = this.props;
    if(!leftIcon && !leftAvatar) {
      return null;
    }

    return React.cloneElement(leftIcon || leftAvatar, { key: 'left-children' });
  };

  renderRightChildren = () => {
    const {
      rightIcon,
      rightAvatar,
      expanderIconChildren,
      expanderIconClassName,
      nestedItems,
      disabled,
    } = this.props;

    if(!rightIcon && !rightAvatar && !(nestedItems && nestedItems.length)) { return null; }

    if(nestedItems && nestedItems.length) {
      const className = classnames('md-list-expander', { 'active': this.isOpen() });
      if(!rightIcon) {
        return (
          <IconButton
            key="toggle"
            disabled={disabled}
            onClick={this.toggleNestedItems}
            iconClassName={expanderIconClassName}
            className={className}
            children={expanderIconChildren}
          />
        );
      }

      return React.cloneElement(rightIcon, { key: 'toggle', className });
    }

    return React.cloneElement(rightIcon || rightAvatar, { key: 'right-children' });
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
    const { onClick, nestedItems, expandOnClick, disabled } = this.props;
    if(disabled) { return; }
    onClick && onClick(e);

    if(expandOnClick && nestedItems) {
      this.toggleNestedItems(e);
    }
  };

  render() {
    const { hover } = this.state;
    const {
      component,
      className,
      containerClassName,
      primaryText,
      secondaryText,
      threeLines,
      leftIcon,
      leftAvatar,
      rightIcon,
      rightAvatar,
      nestedItems,
      expanderIconClassName,
      expanderIconChildren,
      disabled,
      ...props,
    } = this.props;

    const text = (
      <ListItemText
        key="text"
        primaryText={primaryText}
        secondaryText={secondaryText}
        className={classnames({
          'avatar-offset': !!leftAvatar,
          'icon-offset': !!leftIcon,
        })}
      />
    );

    let content = React.createElement(component, {
      role: 'button',
      tabIndex: component === 'div' && !nestedItems ? 0 : null,
      ...props,
      disabled,
      onClick: this.handleClick,
      className: classnames('md-list-tile', className, {
        'secondary-action': nestedItems && nestedItems.length,
        'avatar-height': leftAvatar || rightAvatar,
        'two-lines': secondaryText,
        'three-lines': threeLines && secondaryText,
      }),
    }, [this.renderLeftChildren(), text, this.renderRightChildren()]);

    content = <Ink disabled={disabled}>{content}</Ink>;

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
      <TransitionGroup
        component="li"
        className={classnames('md-list-item', containerClassName, { hover })}
        onMouseOver={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        {content}
        {children}
      </TransitionGroup>
    );
  }
}
