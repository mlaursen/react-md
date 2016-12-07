import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import FontIcon from '../FontIcons/FontIcon';

export default class Chip extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * An optional icon className to use for the remove icon when `removable`.
     */
    iconClassName: PropTypes.string,

    /**
     * Boolean if the `.md-chip-icon--rotate` style should be applied to the remove icon.
     * The `.md-chip-icon--rotate` just rotates the icon 45 degrees.
     */
    rotateIcon: PropTypes.bool,

    /**
     * Any children used to display the remove icon when `removable`.
     */
    children: PropTypes.node,

    /**
     * The label to display on the chip.
     */
    label: PropTypes.string.isRequired,

    /**
     * Boolean if the chip is removable.
     */
    removable: PropTypes.bool,

    /**
     * An optional avatar to display on the chip.
     */
    avatar: PropTypes.element,

    /**
     * An optional function to call when the `click` event is triggered.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the `mouseover` event is triggered.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when the `mouseleave` event is triggered.
     */
    onMouseLeave: PropTypes.func,
    remove: deprecated(PropTypes.func, 'Use `removable` and `onClick` instead'),
    removeIconChildren: deprecated(PropTypes.node, 'Use `iconChildren` instead'),
    removeIconClassName: deprecated(PropTypes.string, 'Use `iconClassName` instead'),
  };

  static defaultProps = {
    rotateIcon: true,
    children: 'add_circle',
  };

  constructor(props) {
    super(props);

    this.state = { hover: false };
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  _handleMouseOver(e) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    this.setState({ hover: true });
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    this.setState({ hover: false });
  }

  render() {
    const { hover } = this.state;
    const {
      label,
      className,
      iconClassName,
      avatar,
      children,
      removable,
      remove,
      onClick,
      rotateIcon,
      ...props
    } = this.props;
    delete props.removeIconChildren;
    delete props.removeIconClassName;

    let icon;
    if (removable || remove) {
      icon = (
        <FontIcon
          className={cn('md-chip-icon', {
            'md-chip-icon--rotate': rotateIcon,
            'md-chip-text--hover': hover,
          })}
          iconClassName={iconClassName}
        >
          {children}
        </FontIcon>
      );
    }

    return (
      <button
        type="button"
        {...props}
        className={cn('md-chip', {
          'md-chip--avatar': avatar,
          'md-chip--remove': removable,
          'md-chip--hover': hover,
        }, className)}
        onClick={remove || onClick}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
      >
        {avatar}
        <span
          className={cn('md-chip-text', {
            'md-chip-text--hover': hover,
          })}
        >
          {label}
        </span>
        {icon}
      </button>
    );
  }
}
