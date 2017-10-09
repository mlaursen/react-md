import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import deprecated from 'react-prop-types/lib/deprecated';

import { TAB } from '../constants/keyCodes';
import TICK from '../constants/CSSTransitionGroupTick';
import getBtnStyles from './getBtnStyles';
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
 * A `RaisedButton` is a button with some depth to help actions have more prominent in flat
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
     * A boolean if the icon should appear before or after the text for a `FlatButton` or
     * a `RaisedButton`.
     */
    iconBefore: PropTypes.bool,

    /**
     * Any children used to display the button. When the button type is `icon` or `floating`,
     * this can be used to render the `FontIcon` instead of the `iconChildren` prop.
     *
     * When the button type is `raised` or `flat`, this will be the label or any other elements
     * you'd like to display in the button. This can work hand-in-hand with the `iconClassName`
     * and `iconChildren` to make a button with an icon and text.
     */
    children: PropTypes.node,

    /**
     * An icon className to use in an optional `FontIcon` in any version of the button. This will
     * be used with the `children` prop. If the `floating` or `icon` props are set to true, this or
     * the children are required.
     *
     * @see {@link #iconEl}
     */
    iconClassName: PropTypes.string,

    /**
     * Any children to use to display an icon in the button.
     *
     * @see {@link #iconEl}
     */
    iconChildren: PropTypes.node,

    /**
     * An optional icon to display. This prop is recommended over the `iconClassName` and `iconChildren`
     * props since it allows more control for you. There is also better SVG support since it won't wrap
     * the SVG with the `FontIcon` element.
     */
    iconEl: PropTypes.element,

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
     * An optional function to call when the `mouseenter` event is triggered.
     */
    onMouseEnter: PropTypes.func,

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
     * the page. This prop is only used if the `floating` prop and `fixed` prop are
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
     *
     * @see {@link #svg}
     */
    icon: PropTypes.bool,

    /**
     * Boolean if the `Button` should be styled as a `FloatingButton`.
     *
     * @see {@link #svg}
     */
    floating: PropTypes.bool,

    /**
     * Boolean if the theming of `primary` or `secondary` should be swapped. By default,
     * only flat and icon buttons can gain the theme colors as text color while the raised
     * and floating buttons can gain the theme colors as background color.
     *
     * If this prop is enabled, the flat and icon buttons will gain the theme background colors
     * while the raised and icon will gain the theme text colors instead.
     *
     * @see {@link #primary}
     * @see {@link #secondary}
     */
    swapTheming: PropTypes.bool,

    /**
     * An optional label to use for the tooltip. This is normally only used for
     * `IconButton`s or `FloatingButton`s, but can be used on `FlatButton`s and
     * `RaisedButton`s if you wish. Knock yourself out!
     *
     * If this prop is omitted, no tooltip will be included.
     */
    tooltipLabel: PropTypes.node,

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

    /**
     * Boolean if the child is an SVGIcon or FontIcon when using the `icon` or `floating` props. This is only needed
     * until the next release when the `label` migration can be removed.
     */
    svg: PropTypes.bool,

    label: deprecated(PropTypes.node, 'Use the `children` prop instead'),
    noIcon: deprecated(
      PropTypes.bool,
      'This has been removed during the alpha release. Children will always attempt to be rendered outside of an ' +
      'icon by default for flat and raised buttons.'
    ),
  };

  static defaultProps = {
    type: 'button',
    iconBefore: true,
    fixedPosition: 'br',
  };

  state = {
    pressed: false,
    snackbar: false,
    snackbarType: null,
  };

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

  _blur = () => {
    if (this.props.disabled) {
      return;
    }

    if (this._timeout) {
      this._attemptedBlur = true;
    } else {
      this.setState({ pressed: false });
    }
  };

  _handleMouseUp = (e) => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }

    this._blur();
  };

  _handleMouseDown = (e) => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }

    if (!this.props.disabled) {
      this.setState({ pressed: true });
    }
  };

  _handleTouchStart = (e) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    if (!this.props.disabled) {
      this.setState({ pressed: true });
    }
  };

  _handleTouchEnd = (e) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    this._blur();
    captureNextEvent('mouseover');
  };

  _handleKeyUp = (e) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }


    if ((e.which || e.keyCode) === TAB) {
      window.addEventListener('click', this._blur);
      this.setState({ pressed: true });
    }
  };

  _handleKeyDown = (e) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if ((e.which || e.keyCode) === TAB) {
      window.removeEventListener('click', this._blur);
      this.setState({ pressed: false });
    }
  };

  _handleMouseEnter = (e) => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }

    if (!this.props.disabled) {
      this.setState({ hover: true });
    }
  };

  _handleMouseLeave = (e) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (!this.props.disabled) {
      this.setState({ hover: false });
    }
  };

  _animateForSnackbar = (multiline, leaveTimeout) => {
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
  };

  render() {
    const {
      className,
      iconClassName,
      iconChildren,
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
      type,
      children,
      swapTheming,
      svg,
      iconEl: propIconEl, // eslint-disable-line no-unused-vars
      label, // deprecated
      ...props
    } = this.props;
    let { iconEl } = this.props;

    if (!href) {
      props.type = type;
    }

    const { pressed, hover, snackbar, snackbarType } = this.state;
    const iconBtnType = icon || floating;

    let visibleChildren;
    if (!iconEl && !svg && (iconClassName || iconChildren || iconBtnType || (label && children))) {
      let resolvedIconChildren = iconChildren;
      if (typeof iconChildren === 'undefined') {
        resolvedIconChildren = iconBtnType || label ? children : null;
      }

      iconEl = (
        <FontIcon iconClassName={iconClassName} forceSize={forceIconSize} forceFontSize={forceIconFontSize} inherit>
          {resolvedIconChildren}
        </FontIcon>
      );
    } else if (iconEl || svg) {
      const el = React.Children.only(iconEl || children);
      iconEl = React.cloneElement(el, { inherit: !el.props.error });
    }

    if (!iconBtnType) {
      visibleChildren = label || children;
      if (iconEl) {
        visibleChildren = <IconSeparator label={visibleChildren} iconBefore={iconBefore}>{iconEl}</IconSeparator>;
      }
    } else {
      visibleChildren = iconEl;
    }

    const Component = component || (href ? 'a' : 'button');
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
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        href={href}
        className={getBtnStyles({
          flat,
          raised,
          icon,
          floating,
          disabled,
          primary,
          secondary,
          hover,
          swapTheming,
          pressed,
          mini,
          fixed,
          fixedPosition,
        }, {
          'md-btn--tooltip': tooltip,
          'md-btn--snackbar-floating': snackbar,
          [`md-btn--snackbar-floating-${snackbarType}adjust`]: snackbar && snackbarType !== null,
        }, 'md-inline-block', className)}
      >
        {ink}
        {tooltip}
        {visibleChildren}
      </Component>
    );
  }
}

export default injectInk(injectTooltip(Button));
