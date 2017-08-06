import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    label: PropTypes.node.isRequired,

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
     * An optional function to call when the `mouseenter` event is triggered.
     */
    onMouseEnter: PropTypes.func,

    /**
     * An optional function to call when the `mouseleave` event is triggered.
     */
    onMouseLeave: PropTypes.func,

    iconClassName: deprecated(PropTypes.string, 'Use the `children` prop as a single FontIcon or SVGIcon instead'),
    remove: deprecated(PropTypes.func, 'Use `removable` and `onClick` instead'),
    removeIconChildren: deprecated(PropTypes.node, 'Use `children` instead'),
    removeIconClassName: deprecated(PropTypes.string, 'Use `iconClassName` instead'),
  };

  static defaultProps = {
    rotateIcon: true,
    children: <FontIcon>add_circle</FontIcon>,
  };

  state = { hover: false };

  _handleMouseEnter = (e) => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }

    this.setState({ hover: true });
  };

  _handleMouseLeave = (e) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    this.setState({ hover: false });
  };

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
      removeIconChildren, // eslint-disable-line no-unused-vars
      removeIconClassName, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    let icon;
    if (removable || remove) {
      const chipIconCN = cn('md-chip-icon', {
        'md-chip-icon--rotate': rotateIcon,
        'md-chip-text--hover': hover,
      });

      if (React.isValidElement(children)) {
        icon = React.Children.only(children);
        icon = React.cloneElement(icon, { className: cn(chipIconCN, icon.props.className) });
      } else {
        icon = (
          <FontIcon className={chipIconCN} iconClassName={iconClassName}>
            {children}
          </FontIcon>
        );
      }
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
        onMouseEnter={this._handleMouseEnter}
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
