import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { SPACE } from '../constants/keyCodes';
import getField from '../utils/getField';
import themeColors from '../utils/themeColors';
import oneRequiredForA11y from '../utils/PropTypes/oneRequiredForA11y';
import capitalizeFirst from '../utils/StringUtils/capitalizeFirst';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import FontIcon from '../FontIcons/FontIcon';
import SwitchTrack from './SwitchTrack';

/**
 * Prevents a second warning from appearing when using the deprecated or a11y required
 * props by using the `__superSecretProp`.... So secret!
 */
function preventDouble(validator) {
  return function validate(props, propName, ...others) {
    let err = validator(props, propName, ...others);
    if (err && props.__superSecreteProp) {
      err = null;
    }

    return err;
  };
}

/**
 * The `SelectionControl` component is used to render any of the `Radio`, `Checkbox`, or `Switch`
 * selection control type. This component might eventually replace all three since they use this
 * anyways. I am not sure yet though.
 */
export default class SelectionControl extends PureComponent {
  static propTypes = {
    /**
     * An id to use with the selection control. This is used for accessibility and so that the label
     * triggers the selection control toggle.
     */
    id: preventDouble(isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]))),

    /**
     * An optional label to apply to the checkbox when there is no visible label.
     */
    'aria-label': oneRequiredForA11y(PropTypes.string, 'label', 'aria-labelledby'),

    /**
     * An optional id that points to a label for the selection control when there is no visible label.
     */
    'aria-labelledby': PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the selection control's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the selection control's container.
     */
    className: PropTypes.string,

    /**
     * The type of selection control to render.
     */
    type: PropTypes.oneOf(['checkbox', 'radio', 'switch']).isRequired,

    /**
     * A label to display with the selection control. This is required for accessibility and triggering
     * the toggle.
     */
    label: PropTypes.node,

    /**
     * Boolean if the label should appear before the checkbox/radio icon or switch.
     */
    labelBefore: PropTypes.bool,

    /**
     * A name to use for the `SelectionControl`. This is required for accessibility. If the `type`
     * is a `checkbox` and it is part of a group, it is recommended to make this a string ending
     * in `[]` so that the value can be found from `document.querySelector('input[name="someName[]"]').value`.
     */
    name: preventDouble(isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]))),

    /**
     * Boolean if the `Radio` is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * A function to call when the `SelectionControl` triggers the `change` event. The `onChange`
     * callback will either include:
     * - the currently changed radio's value
     * - the next checked state for the `Switch` or `Checkbox`.
     *
     * as the first parameter followed by the change event.
     *
     * ```js
     * // Radio
     * onChange(changeEvent.target.value, changeEvent);
     *
     * // Checkbox or Switch
     * onChange(changeEvent.target.checked, changeEvent);
     * ```
     */
    onChange: PropTypes.func,

    /**
     * An optional function to call when the `keydown` event is triggered.
     */
    onKeyDown: PropTypes.func,

    /**
     * The value for the `SelectionControl`. It is not required for `Checkbox` and `Switch`,
     * but it is recommended.
     */
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * A boolean if the `SelectionControl` is currently checked. This _really_ makes the `onChange`
     * prop required, but since there are cases you might want to have the `onChange` listener on a
     * `fieldset` or something above the component, it is never set to `required`. It will however
     * prevent updates if there is no change listener.
     */
    checked: PropTypes.bool,

    /**
     * Boolean if the `Checkbox` or `Switch` are checked by default. This prop is invalid for a
     * `Radio`.
     */
    defaultChecked: PropTypes.bool,

    /**
     * Boolean if the `SelectionControl` should be displayed inline instead of a block.
     */
    inline: PropTypes.bool,

    /**
     * The icon to use for a checked `checkbox` selection control.
     */
    checkedCheckboxIcon: PropTypes.element,

    /**
     * The icon to use for an unchecked `checkbox` selection control.
     */
    uncheckedCheckboxIcon: PropTypes.element,

    /**
     * The icon to use for a checked `radio` selection control.
     */
    checkedRadioIcon: PropTypes.element,

    /**
     * The icon to use for an unchecked `radio` selection control.
     */
    uncheckedRadioIcon: PropTypes.element,

    /**
     * An optional tooltip to render with the control. This is only used if you inject the
     * tooltip manually yourself.
     *
     * `const TooltippedSelectionControl = injectTooltip(SelectionControl);`
     */
    tooltip: PropTypes.node,

    /**
     * Boolean if the ink should be disabled for radios or checkboxes.
     *
     * @see {@link Inks#inkDisabled}
     */
    inkDisabled: PropTypes.bool,

    /**
     * An optional list of ink interactions that should be disabled.
     *
     * @see {@link Inks#disabledInteractions}
     */
    disabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'touch', 'mouse'])),

    /**
     * An optional tab index to apply to the selection control.
     */
    tabIndex: PropTypes.number,

    checkedIcon: preventDouble(deprecated(
      PropTypes.node,
      'Use the `checkedCheckboxIconChildren` and `checkedCheckboxIconClassName`  or the ' +
      '`checkedRadioIconChildren` and `checkedRadioIconClassName` props instead'
    )),
    uncheckedIcon: preventDouble(deprecated(
      PropTypes.node,
      'Use the `uncheckedCheckboxIconChildren` and `uncheckedCheckboxIconClassName`  or the ' +
      '`uncheckedRadioIconChildren` and `uncheckedRadioIconClassName` props instead'
    )),
    checkedCheckboxIconChildren: deprecated(PropTypes.node, 'Use the `checkedCheckboxIcon` prop instead'),
    checkedCheckboxIconClassName: deprecated(PropTypes.string, 'Use the `checkedCheckboxIcon` prop instead'),
    uncheckedCheckboxIconChildren: deprecated(PropTypes.node, 'Use the `uncheckedCheckboxIcon` prop instead'),
    uncheckedCheckboxIconClassName: deprecated(PropTypes.string, 'Use the `uncheckedCheckboxIcon` prop instead'),
    checkedRadioIconChildren: deprecated(PropTypes.node, 'Use the `checkedRadioIcon` prop instead'),
    checkedRadioIconClassName: deprecated(PropTypes.string, 'Use the `checkedRadioIcon` prop instead'),
    uncheckedRadioIconChildren: deprecated(PropTypes.node, 'Use the `uncheckedRadioIcon` prop instead'),
    uncheckedRadioIconClassName: deprecated(PropTypes.string, 'Use the `uncheckedRadioIcon` prop instead'),

    /* maybe removed once upgrade again? */
    __superSecreteProp: PropTypes.bool,
  };

  static defaultProps = {
    checkedCheckboxIcon: <FontIcon>check_box</FontIcon>,
    uncheckedCheckboxIcon: <FontIcon>check_box_outline_blank</FontIcon>,
    checkedRadioIcon: <FontIcon>radio_button_checked</FontIcon>,
    uncheckedRadioIcon: <FontIcon>radio_button_unchecked</FontIcon>,
  };

  constructor(props) {
    super(props);

    this.state = {};
    if (typeof props.checked === 'undefined') {
      this.state.checked = !!props.defaultChecked;
    }
  }

  /**
   * Gets the current checked value from the selection control. This is used when you have
   * an uncontrolled selection control and simply need the checked state from a ref callback.
   *
   * @return {boolean} the checked state for the selection control.\
   */
  get checked() {
    return getField(this.props, this.state, 'checked');
  }

  _setInput = (input) => {
    this._input = input;
  };

  _setControl = (control) => {
    this._control = control;
  };

  _setContainer = (container) => {
    this._container = container;
  };

  _getIcon = () => {
    const { checkedIcon, uncheckedIcon, type } = this.props;
    const checked = getField(this.props, this.state, 'checked');
    if (checkedIcon || uncheckedIcon) {
      return checked ? checkedIcon : uncheckedIcon;
    }

    const prefix = `${checked ? '' : 'un'}checked${capitalizeFirst(type)}Icon`;
    const iconClassName = this.props[`${prefix}ClassName`];
    const children = this.props[`${prefix}Children`];

    if (iconClassName || children) {
      return <FontIcon iconClassName={iconClassName} inherit>{children}</FontIcon>;
    }

    const icon = this.props[prefix];
    return icon ? React.cloneElement(icon, { inherit: true }) : null;
  };

  _handleKeyDown = (e) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    if (key === SPACE) {
      this._input.click();
    }
  }

  _handleChange = (e) => {
    const { type, onChange } = this.props;
    const checked = !getField(this.props, this.state, 'checked');
    if (onChange) {
      onChange(type === 'radio' ? e.target.value : checked, e);
    }

    if (typeof this.props.checked === 'undefined') {
      this.setState({ checked });
    }
  };

  render() {
    const {
      id,
      style,
      className,
      inline,
      type,
      name,
      value,
      disabled,
      labelBefore,
      tabIndex,
      inkDisabled,
      disabledInteractions,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      /* eslint-disable no-unused-vars */
      label: propLabel,
      checked: propChildren,
      onChange,
      tooltip,
      checkedCheckboxIcon,
      uncheckedCheckboxIcon,
      checkedRadioIcon,
      uncheckedRadioIcon,
      __superSecreteProp,

      // deprecated
      checkedIcon,
      uncheckedIcon,
      checkedRadioIconChildren,
      checkedRadioIconClassName,
      uncheckedRadioIconChildren,
      uncheckedRadioIconClassName,
      checkedCheckboxIconChildren,
      checkedCheckboxIconClassName,
      uncheckedCheckboxIconChildren,
      uncheckedCheckboxIconClassName,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const checked = getField(this.props, this.state, 'checked');
    const isSwitch = type === 'switch';
    const label = this.props.label && <span>{this.props.label}</span>;

    let control;
    if (isSwitch) {
      control = <SwitchTrack disabled={disabled} checked={checked} />;
    } else {
      control = (
        <AccessibleFakeInkedButton
          inkDisabled={inkDisabled}
          disabledInteractions={disabledInteractions}
          role={type}
          className={cn('md-selection-control-toggle md-btn md-btn--icon', themeColors({
            disabled,
            hint: !checked,
            secondary: checked,
          }))}
          aria-checked={checked}
          tabIndex={tabIndex}
          disabled={disabled}
        >
          {tooltip}
          {this._getIcon()}
        </AccessibleFakeInkedButton>
      );
    }


    return (
      <div
        {...props}
        style={style}
        className={cn('md-selection-control-container', {
          'md-selection-control-container--inline': inline,
          'md-switch-container': isSwitch,
        }, className)}
        onKeyDown={this._handleKeyDown}
      >
        <input
          ref={this._setInput}
          id={id}
          type={isSwitch ? 'checkbox' : type}
          checked={checked}
          onChange={this._handleChange}
          disabled={disabled}
          className="md-selection-control-input"
          name={name}
          value={value}
          aria-hidden
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        />
        <label
          htmlFor={id}
          className={cn('md-selection-control-label', {
            'md-pointer--hover': !disabled,
          }, themeColors({ disabled, text: !disabled }))}
        >
          {labelBefore && label}
          {control}
          {!labelBefore && label}
        </label>
      </div>
    );
  }
}
