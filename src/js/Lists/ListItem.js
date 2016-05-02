import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { IconButton } from '../Buttons';
import { Height } from '../Transitions';
import List from './List';
import ListTile from './ListTile';
import ListItemText from './ListItemText';

/**
 * A component for rendering a `li` component with icons, avatars, and text.
 *
 * Any remaing props will be passed to the inner `ListItem` component. This
 * will allow you to use custom components such as `react-router`'s `Link`
 * component.
 */
export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: props.initiallyOpen, hover: false };
  }

  static propTypes = {
    /**
     * This should be the main text to display.
     */
    primaryText: PropTypes.node.isRequired,

    /**
     * An optional secondary text to display below the `primaryText`. This can
     * be an additional 1 or 2 lines. The text will automatically be ellipsed
     * if it spans more than one line. If the prop `threeLines` is set to true,
     * then the text will automatically be ellipsed if it spans more than two lines.
     */
    secondaryText: PropTypes.node,

    /**
     * The className to apply to the `.md-list-item` component which is the
     * entire container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the `.md-list-item` component.
     */
    style: PropTypes.object,

    /**
     * The className to apply to the `.md-list-tile` component.
     */
    tileClassName: PropTypes.string,

    /**
     * An optional style to apply to the `.md-list-tile` component.
     */
    tileStyle: PropTypes.object,

    /**
     * An optional icon to display to the left of the text.
     */
    leftIcon: PropTypes.node,

    /**
     * An optional avatar to display to the left of the text.
     */
    leftAvatar: PropTypes.node,

    /**
     * An optional icon to display to the left of the text.
     */
    rightIcon: PropTypes.node,

    /**
     * An optional avatar to display to the left of the text.
     */
    rightAvatar: PropTypes.node,

    /**
     * The component to render the `.md-list-tile` as. This can be set
     * as an external component if you need additional functionality.
     *
     * An example would be setting this to be `react-router`'s `Link` component
     * so that it redirects on click.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * An optional list of `ListItem`, `ListItemControl`, `Divider`, or `Subheader`
     * to use as a nested list.
     */
    nestedItems: PropTypes.arrayOf(PropTypes.node),

    /**
     * Boolean if the nested list should initially be displayed.
     */
    initiallyOpen: PropTypes.bool,

    /**
     * Boolean if the nested list is currently open. This forces the component
     * to be a controlled component.
     */
    isOpen: PropTypes.bool,

    /**
     * The optional function to call when the nested item expander button is clicked.
     */
    onExpanderClick: PropTypes.func,

    /**
     * A boolean if the nested items should be toggled if the `ListItem` is clicked
     * instead of only the expander button.
     */
    expandOnClick: PropTypes.bool,

    /**
     * Any children required to render the expander icon.
     */
    expanderIconChildren: PropTypes.node,

    /**
     * The icon className to use for the expander icon.
     */
    expanderIconClassName: PropTypes.string,

    /**
     * An optional function to call when the `ListItem` is clicked.
     */
    onClick: PropTypes.func,

    /**
     * Boolean if the item is currently disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Boolean if the `ListItem` should allow three lines of text including
     * the `primaryText`.
     */
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
      style,
      tileClassName,
      tileStyle,
      primaryText,
      secondaryText,
      threeLines,
      leftIcon,
      leftAvatar,
      rightAvatar,
      nestedItems,
      disabled,
      ...props,
    } = this.props;

    delete props.rightIcon;
    delete props.expanderIconClassName;
    delete props.expanderIconChildren;

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
        className={classnames('md-list-item', className, { hover })}
        style={style}
      >
        <ListTile
          {...props}
          style={tileStyle}
          component={component}
          disabled={disabled}
          onClick={this.handleClick}
          className={classnames(tileClassName, {
            'secondary-action': nestedItems && nestedItems.length,
            'avatar-height': !secondaryText && (leftAvatar || rightAvatar),
            'two-lines': !threeLines && secondaryText,
            'three-lines': threeLines && secondaryText,
          })}
        >
          {this.renderLeftChildren()}
          <ListItemText
            key="text"
            primaryText={primaryText}
            secondaryText={secondaryText}
            className={classnames({
              'avatar-offset': !!leftAvatar,
              'icon-offset': !!leftIcon,
            })}
          />
          {this.renderRightChildren()}
        </ListTile>
        {children}
      </TransitionGroup>
    );
  }
}
