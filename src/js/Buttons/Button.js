import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';
import FontIcon from '../FontIcons';
import IconSeparator from '../Helpers/IconSeparator';
import injectInk from '../Inks';
import injectTooltip from '../Tooltips';

/**
 * Takes a validator function for a prop, and warns if the prop is used on a button type
 * that is not `floating`.
 *
 * @param {function} validator - The base PropType validator to use.
 * @return {Error} an error or null.
 */
function floatingOnly(validator) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;
    let err = validator(props, propName, componentName, location, propFullName, ...args);

    if (!err && typeof props[propName] !== 'undefined' && (props.flat || props.raised || props.icon)) {
      err = new Error(
        `You provided a \`${propFullNameSafe}\` ${location} to the \`${componentNameSafe}\` ` +
        'when the type was not `icon` or `floating`.'
      );
    }

    return err;
  };
}

/**
 * The `Button` component can either be a `FlatButton`, `RaisedButton`, `IconButton`, or a
 * `FloatingButton`.
 *
 * A `FlatButton` is a button with no depth on the screen that is ideally used in `Dialog`s
 * or `CardActions`. The text can be optionally styled with the `primary` or `secondary` colors.
 *
 * A `RaisedButton` is a button with some depth to help actions have more prominene in flat
 * layouts or layouts with varying content. The background can be styled by the light/dark theme,
 * or optionally the `primary` or `secondary` color.
 *
 * An `IconButton` is a button that just displays a `FontIcon` as the child in a circle.
 * The `FontIcon` can be optionally styled with the `primary` or `secondary` color.
 *
 * A `FloatingButton` is a special case. Woop
 */
class Button extends PureComponent {
  static propTypes = {
    /**
     * A label to display on a `FlatButton` or a `RaisedButton`. This text can either
     * be placed before or after an optional `FontIcon` using the `iconBefore` prop.
     */
    label: PropTypes.string,

    /**
     * An optional style to apply to the button.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the button.
     */
    className: PropTypes.string,

    /**
     * A boolean if the icon should appear before or after the text for a `FlatButton` or
     * a `RaisedButton`.
     */
    iconBefore: PropTypes.bool,

    /**
     * Any children used to display a `FontIcon` in any version of the button. This will
     * be used with the `iconClassName` prop. If the `iconClassName` and the `children` prop
     * are omitted, no icon will be added to the `RaisedButton` or `FlatButton`. An error
     * will be displayed for the `IconButton` or `FloatingButton`.
     */
    children: (props, propName, componentName, ...args) => {
      const componentNameSafe = componentName || '<<anonymous>>';
      let err = PropTypes.node(props, propName, componentName, ...args);

      const icon = props.icon || props.floating;
      const missing = !props.children && !props.iconClassName;
      if (!err && icon && missing) {
        err = new Error(
          `You created an \`${props.icon ? 'Icon' : 'Floating'}\` ${componentNameSafe} without ` +
          'having the correct props to generate an icon. Expected either the `children` prop or the ' +
          `\`iconClassName\` prop but received children: \`${props.children}\` and iconClassName: ` +
          `\`${props.iconClassName}\`.`
        );
      }

      return err;
    },

    /**
     * An icon className to use in an optional `FontIcon` in any version of the button. This will
     * be used with the `children` prop. IF the `floating` or `icon` props are set to true, this or
     * the children are required.
     */
    iconClassName: PropTypes.string,

    /**
     * The type for the button.
     */
    type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,

    /**
     * Boolean if the button should be styled with the primary color.
     */
    primary: PropTypes.bool,

    /**
     * Boolean if the button should be styled with the secondary color.
     */
    secondary: PropTypes.bool,

    /**
     * Boolean if the button is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional href for the button. This will style the `a` tag as a button.
     */
    href: PropTypes.string,

    /**
     * An optional component to render the button as. This allows you to get all the styles and functionality
     * of the Button, but as a custom React component.
     */
    component: PropTypes.func,

    /**
     * An optional function to call when the `click` event is triggered.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the `touchstart` event is triggered.
     */
    onTouchStart: PropTypes.func,

    /**
     * An optional function to call when the `touchend` event is triggered.
     */
    onTouchEnd: PropTypes.func,

    /**
     * An optional function to call when the `mousedown` event is triggered.
     */
    onMouseDown: PropTypes.func,

    /**
     * An optional function to call when the `mouseup` event is triggered.
     */
    onMouseUp: PropTypes.func,

    /**
     * An optional function to call when the `keyup` event is triggered.
     */
    onKeyUp: PropTypes.func,

    /**
     * An optional function to call when the `keydown` event is triggered.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional function to call when the `mouseover` event is triggered.
     */
    onMouseOver: PropTypes.func,

    /**
     * An optional function to call when the `mouseleave` event is triggered.
     */
    onMouseLeave: PropTypes.func,

    /**
     * Boolean if the `FloatingButton` should be fixed to the page. This prop can
     * only be enabled if the `floating` prop is true.
     */
    fixed: floatingOnly(PropTypes.bool),

    /**
     * The position that the `FloatingButton` should be fixed to the page. It will
     * either be fixed to the top right, top left, bottom right, or bottom left of
     * the page. This prop is ony used if the `floating` prop and `fixed` rpop are
     * `true`.
     */
    fixedPosition: PropTypes.oneOf(['tr', 'tl', 'br', 'bl']).isRequired,

    /**
     * Boolean if the `FloatingButton` should be `mini`. This prop can only be used
     * when the `floating` prop is true.
     */
    mini: floatingOnly(PropTypes.bool),

    /**
     * Boolean if the `Button` should be styled as a `FlatButton`.
     */
    flat: PropTypes.bool,

    /**
     * Boolean if the `Button` should be styled as a `RaisedButton`.
     */
    raised: PropTypes.bool,

    /**
     * Boolean if the `Button` should be styled as a `IconButton`.
     */
    icon: PropTypes.bool,

    /**
     * Boolean if the `Button` should be styled as a `FloatingButton`.
     */
    floating: PropTypes.bool,

    /**
     * The injected tooltip from `injectTooltip`.
     */
    tooltip: PropTypes.node,

    /**
     * An optional label to use for the tooltip. This is normally only used for
     * `IconButton`s or `FloatingButton`s, but can be used on `FlatButton`s and
     * `RaisedButton`s if you wish. Knock yourself out!
     *
     * If this prop is omitted, no tooltip will be included.
     */
    tooltipLabel: PropTypes.string,

    /**
     * An optional delay before the tooltip appears on mouse over.
     */
    tooltipDelay: PropTypes.number,

    /**
     * The timeout to use for displaying the tooltip when using a touch device.
     */
    tooltipTouchTimeout: PropTypes.number,

    /**
     * The position for the tooltip.
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * Custom validator for verifying that only one type is defined and that
     * at one type is defined.
     */
    _typeValidator: (props, propName, component) => {
      const { flat, raised, icon, floating } = props;

      const defined = [raised, flat, icon, floating].filter(d => d);
      const len = defined.length;
      if (len === 0) {
        return new Error(
          `A material design button type must be specified in the \`${component}\` but none were ` +
          'given. Valid types are `flat`, `raised`, `icon`, or `floating`.'
        );
      } else if (len !== 1) {
        return new Error(
          `Only one material design button type may be specified in the \`${component}\` but \`${len}\` ` +
          'were given. Select only one of `flat`, `raised`, `icon`, or `floating`.'
        );
      }

      return null;
    },
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
    fixedPosition: 'br',
  };

  constructor(props) {
    super(props);

    this.state = { active: false, pressed: false };

    this._blur = this._blur.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    window.removeEventListener('click', this._blur);
  }

  _getType(props) {
    if (props.flat || (props.disabled && props.raised)) {
      return 'flat';
    } else if (props.icon || (props.disabled && props.floating)) {
      return 'icon';
    } else if (props.raised) {
      return 'raised';
    } else if (props.floating) {
      return 'icon md-btn--floating';
    }

    return 'flat';
  }

  _blur() {
    if (this.props.disabled) {
      return;
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ pressed: false });
    }, 450);
    this.setState({ active: false });
  }

  _handleMouseUp(e) {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }

    this._blur();
  }

  _handleMouseDown(e) {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }

    if (!this.props.disabled) {
      this.setState({ active: false, pressed: true, time: Date.now() });
    }
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    if (!this.props.disabled) {
      this._touched = true;
      this.setState({ active: true, pressed: true, time: Date.now() });
    }
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    this._touched = false;
    this._blur();
  }

  _handleKeyUp(e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }


    if ((e.which || e.keyCode) === TAB) {
      window.addEventListener('click', this._blur);
      this.setState({ pressed: true });
    }
  }

  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if ((e.which || e.keyCode) === TAB) {
      window.removeEventListener('click', this._blur);
      this.setState({ pressed: false });
    }
  }

  _handleMouseOver(e) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (!this.props.disabled && !this._touched) {
      this.setState({ hover: true });
    }
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (!this.props.disabled && !this._touched) {
      this.setState({ hover: false });
    }
  }

  render() {
    const {
      className,
      iconClassName,
      label,
      iconBefore,
      href,
      primary,
      secondary,
      flat,
      raised,
      floating,
      mini,
      fixed,
      fixedPosition,
      disabled,
      tooltip,
      component,
      ...props,
    } = this.props;
    delete props.children;
    delete props.icon;
    delete props.tooltipLabel;
    delete props.tooltipPosition;

    if (href) {
      delete props.type;
    }

    let { children } = this.props;
    const { pressed, active, hover } = this.state;
    const mdBtnType = this._getType(this.props);

    const Component = component || (href ? 'a' : 'button');
    if (children || iconClassName) {
      children = <FontIcon iconClassName={iconClassName}>{children}</FontIcon>;
    }

    if (children && label) {
      children = <IconSeparator label={label} iconBefore={iconBefore} children={children} />;
    } else if (label) {
      children = label;
    }

    const raisedStyles = raised || floating;
    return (
      <Component
        {...props}
        disabled={disabled}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}
        onKeyDown={this._handleKeyDown}
        onKeyUp={this._handleKeyUp}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
        href={href}
        className={cn(`md-btn md-btn--${mdBtnType}`, {
          'md-btn--text': flat || raised,
          'md-btn--hover': hover,
          'md-btn--color-primary': !disabled && !raisedStyles && primary,
          'md-btn--color-secondary': !disabled && !raisedStyles && secondary,
          'md-btn--color-primary-active': !disabled && !raisedStyles && hover && primary,
          'md-btn--color-secondary-active': !disabled && !raisedStyles && hover && secondary,
          'md-btn--raised-primary': !disabled && raisedStyles && primary,
          'md-btn--raised-secondary': !disabled && raisedStyles && secondary,
          'md-btn--raised-active': !disabled && raisedStyles && active,
          'md-btn--fixed': fixed,
          [`md-btn--fixed-${fixedPosition}`]: floating && fixed,
          'md-btn--floating-mini': floating && mini,
          'md-btn--floating-pressed': floating && pressed,
        }, className)}
      >
        {tooltip}
        {children}
      </Component>
    );
  }
}

export default injectTooltip(injectInk(Button));
