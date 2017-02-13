import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';
import TICK from '../constants/CSSTransitionGroupTick';
import invalidIf from '../utils/PropTypes/invalidIf';
import captureNextEvent from '../utils/EventUtils/captureNextEvent';
import FontIcon from '../FontIcons/FontIcon';
import IconSeparator from '../Helpers/IconSeparator';
import injectInk from '../Inks/injectInk';
import injectTooltip from '../Tooltips/injectTooltip';

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
     * An optional style to apply to the button.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the button.
     */
    className: PropTypes.string,

    /**
     * A label to display on a `FlatButton` or a `RaisedButton`. This text can either
     * be placed before or after an optional `FontIcon` using the `iconBefore` prop.
     * This is required for `Flat` or `Raised` buttons. It is not allowed for `Icon`
     * or `Floating` buttons. Use the `tooltipLabel` prop for `Icon` or `Floating` buttons.
     */
    label: invalidIf(PropTypes.string, 'icon', 'floating'),

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
     * be used with the `children` prop. If the `floating` or `icon` props are set to true, this or
     * the children are required.
     */
    iconClassName: PropTypes.string,

    /**
     * The type for the button. This is required when the `component` prop is not
     * the 'a' tag, a `function`, or when the `href` prop is defined.
     */
    type: (props, propName, component, ...args) => {
      const c = props.component;
      let validator = PropTypes.oneOf(['button', 'submit', 'reset']);
      if (!props.href && c !== 'a' && typeof c !== 'function') {
        validator = validator.isRequired;
      }

      return validator(props, propName, component, ...args);
    },

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
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),

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
    fixed: invalidIf(PropTypes.bool, 'flat', 'raised', 'icon'),

    /**
     * The position that the `FloatingButton` should be fixed to the page. It will
     * either be fixed to the top right, top left, bottom right, or bottom left of
     * the page. This prop is ony used if the `floating` prop and `fixed` prop are
     * `true`.
     */
    fixedPosition: PropTypes.oneOf(['tr', 'tl', 'br', 'bl']).isRequired,

    /**
     * Boolean if the `FloatingButton` should be `mini`. This prop can only be used
     * when the `floating` prop is true.
     */
    mini: invalidIf(PropTypes.bool, 'flat', 'raised', 'icon'),

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
     * The position for the tooltip.
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * An ink from `injectInk`.
     * @access private
     */
    ink: PropTypes.node,

    /**
     * A tooltip from `injectTooltip`
     * @access private
     */
    tooltip: PropTypes.node,

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

    /**
     * Either a boolean that will enforce the 24x24 size of the font icon or a number of the size
     * to enforce. This is useful when using other font icon libraries that do not have a consistent
     * size.
     */
    forceIconSize: FontIcon.propTypes.forceSize,

    /**
     * Boolean if the `forceIconSize` prop should also force the `font-size` instead of only `width` and `height`.
     */
    forceIconFontSize: PropTypes.bool,
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
    fixedPosition: 'br',
  };

  constructor(props) {
    super(props);

    this.state = {
      pressed: false,
      snackbar: false,
      snackbarType: null,
    };

    this._blur = this._blur.bind(this);
    this._animateForSnackbar = this._animateForSnackbar.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled && !nextProps.disabled && this.state.hover) {
      this.setState({ hover: false });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.pressed && nextState.pressed) {
      this._timeout = setTimeout(() => {
        this._timeout = null;
        if (this._attemptedBlur) {
          this._attemptedBlur = false;

          this.setState({ pressed: false });
        }
      }, 450);
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    if (this._snackbarTimeout) {
      clearTimeout(this._snackbarTimeout);
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
      this._attemptedBlur = true;
    } else {
      this.setState({ pressed: false });
    }
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
      this.setState({ pressed: true });
    }
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    if (!this.props.disabled) {
      this.setState({ pressed: true });
    }
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    this._blur();
    captureNextEvent('mouseover');
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

    if (!this.props.disabled) {
      this.setState({ hover: true });
    }
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (!this.props.disabled) {
      this.setState({ hover: false });
    }
  }

  _animateForSnackbar(multiline, leaveTimeout) {
    if (typeof leaveTimeout === 'number') {
      this._snackbarTimeout = setTimeout(() => {
        this._snackbarTimeout = setTimeout(() => {
          this._snackbarTimeout = null;

          this.setState({ snackbar: false });
        }, leaveTimeout + 150);

        this.setState({ snackbarType: null });
      }, TICK);
    } else {
      this._snackbarTimeout = setTimeout(() => {
        this._snackbarTimeout = null;

        this.setState({ snackbar: true, snackbarType: multiline ? 'multiline-' : '' });
      }, TICK);
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
      component,
      ink,
      tooltip,
      icon,
      forceIconSize,
      forceIconFontSize,
      ...props
    } = this.props;
    delete props.children;
    delete props.tooltipLabel;
    delete props.tooltipPosition;

    if (href) {
      delete props.type;
    }

    let { children } = this.props;
    const { pressed, hover, snackbar, snackbarType } = this.state;
    const mdBtnType = this._getType(this.props);

    const Component = component || (href ? 'a' : 'button');
    if (children || iconClassName) {
      children = (
        <FontIcon iconClassName={iconClassName} forceSize={forceIconSize} forceFontSize={forceIconFontSize}>
          {children}
        </FontIcon>
      );
    }

    if (children && label) {
      children = <IconSeparator label={label} iconBefore={iconBefore}>{children}</IconSeparator>;
    } else if (label) {
      children = label;
    }

    const raisedStyles = raised || floating;

    const themeClassNames = !disabled && cn({
      'md-text--theme-primary md-ink--primary': !raisedStyles && primary,
      'md-text--theme-secondary md-ink--secondary': !raisedStyles && secondary,
      'md-background--primary md-background--primary-hover': raisedStyles && primary,
      'md-background--secondary md-background--secondary-hover': raisedStyles && secondary,
      'md-btn--color-primary-active': !raisedStyles && hover && primary,
      'md-btn--color-secondary-active': !raisedStyles && hover && secondary,
    });
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
        className={cn(`md-inline-block md-btn md-btn--${mdBtnType}`, themeClassNames, {
          'md-text': !disabled && !primary && !secondary && !icon && !floating,
          'md-text--disabled': disabled,
          'md-pointer--hover': !disabled,
          'md-btn--text': flat || raised,
          'md-btn--hover': hover && !disabled,
          'md-btn--raised-disabled': raised && disabled,
          'md-btn--raised-pressed': !disabled && raisedStyles && pressed,
          'md-btn--fixed': fixed,
          [`md-btn--fixed-${fixedPosition}`]: floating && fixed,
          'md-btn--floating-mini': floating && mini,
          'md-btn--floating-pressed': floating && pressed,
          'md-btn--snackbar-floating': snackbar,
          [`md-btn--snackbar-floating-${snackbarType}adjust`]: snackbar && snackbarType !== null,
        }, className)}
      >
        {ink}
        {tooltip}
        {children}
      </Component>
    );
  }
}

export default injectInk(injectTooltip(Button));
