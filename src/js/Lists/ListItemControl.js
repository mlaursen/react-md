import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';
import ListItemText from './ListItemText';
import TileAddon from './TileAddon';

export default class ListItemControl extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the `.md-list-item`.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `.md-list-item`.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the `.md-list-tile`.
     */
    tileStyle: PropTypes.object,

    /**
     * An optional className to apply to the `.md-list-tile`.
     */
    tileClassName: PropTypes.string,

    /**
     * The primary text to display in the `ListItemControl`. The `primaryAction` or
     * `secondaryAction` will end up getting the `label` prop injected into it with
     * a combination of the `primaryText` and `secondaryText`. If the `primaryAction`
     * or `secondaryAction` already have a label prop, the `label` prop will be used
     * as the `primaryText`.
     */
    primaryText: PropTypes.node,

    /**
     * An optional secondary text that can be displayed in the label of the `primaryAction`
     * or `secondaryAction`.
     */
    secondaryText: PropTypes.node,

    /**
     * Boolean if the primary and secondary text will span three lines.
     */
    threeLines: PropTypes.bool,

    /**
     * The primary action of the `ListItemControl`. This _should_ normally
     * be a type of `SelectionControl`
     */
    primaryAction: PropTypes.element,

    /**
     * The secondary action of the `ListItemControl`. This _should_ normally
     * be a type of `SelectionControl`. If it is a selection control,
     * make sure to add the `labelBefore` prop to get correct positioning.
     */
    secondaryAction: PropTypes.element,

    /**
     * An optional `FontIcon` to display to the left of the action.
     */
    leftIcon: PropTypes.node,

    /**
     * An optional `Avatar` to display to the left of the action.
     */
    leftAvatar: PropTypes.node,

    /**
     * An optional `FontIcon` to display to the right of the action.
     */
    rightIcon: PropTypes.node,

    /**
     * An optional `FontIcon` to display to the right of the action.
     */
    rightAvatar: PropTypes.node,

    /**
     * Defines the number of items in the list. This is only required when all items in the
     * list are not present in the DOM.
     *
     * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-setsize
     */
    'aria-setsize': PropTypes.number,

    /**
     * Defines the items position in the list. This is only required when all items in the list
     * are not present in the DOM. The custom validation just requires this prop if the `aria-setsize`
     * prop is defined as a helpful reminder.
     *
     * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-posinset
     */
    'aria-posinset': (props, propName, ...args) => {
      let validator = PropTypes.number;
      if (typeof props['aria-setsize'] !== 'undefined') {
        validator = validator.isRequired;
      }

      return validator(props, propName, ...args);
    },
  };

  render() {
    const {
      className,
      tileStyle,
      tileClassName,
      primaryAction,
      secondaryAction,
      primaryText,
      secondaryText,
      threeLines,
      leftIcon,
      leftAvatar,
      rightIcon,
      rightAvatar,
      ...props
    } = this.props;

    let control = Children.only(primaryAction || secondaryAction);
    const text = (
      <ListItemText
        key="text"
        primaryText={control.props.label || primaryText}
        secondaryText={secondaryText}
        className={cn({
          'md-tile-content--left-icon': leftIcon,
          'md-tile-content--left-avatar': leftAvatar,
          'md-tile-content--left-button': primaryAction,
          'md-tile-content--right-padding': primaryAction,
        })}
      />
    );
    control = cloneElement(control, {
      className: cn('md-list-control', {
        'md-list-control--right': secondaryAction,
      }, control.props.className),
      label: text,
    });

    const leftNode = (
      <TileAddon
        key="left-addon"
        icon={leftIcon}
        avatar={leftAvatar}
      />
    );

    const rightNode = (
      <TileAddon
        key="right-addon"
        icon={rightIcon}
        avatar={rightAvatar}
      />
    );

    const icond = !!leftIcon || !!rightIcon;
    const avatard = !!leftAvatar || !!rightAvatar;

    return (
      <li {...props} className={cn('md-list-item', className)}>
        <div
          style={tileStyle}
          className={cn('md-list-tile', {
            'md-list-tile--icon': !secondaryText && icond && !avatard,
            'md-list-tile--avatar': !secondaryText && avatard,
            'md-list-tile--two-lines': secondaryText && !threeLines,
            'md-list-tile--three-lines': secondaryText && threeLines,
            'md-list-tile--control-left': primaryAction,
            'md-list-tile--control-right': secondaryAction,
          }, themeColors({ text: true }), tileClassName)}
        >
          {leftNode}
          {control}
          {rightNode}
        </div>
      </li>
    );
  }
}
