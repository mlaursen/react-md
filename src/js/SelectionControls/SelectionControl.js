import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import { SPACE } from '../constants/keyCodes';
import getField from '../utils/getField';
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
     * as the first paramater followed by the change event.
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
     * Any children used to render the checkbox checked `FontIcon`.
     */
    checkedCheckboxIconChildren: PropTypes.node,

    /**
     * An icon className to use to render the checkbox checked `FontIcon`.
     */
    checkedCheckboxIconClassName: PropTypes.string,

    /**
     * Any children used to render the checkbox unchecked `FontIcon`.
     */
    uncheckedCheckboxIconChildren: PropTypes.node,

    /**
     * An icon className to use to render the checkbox unchecked `FontIcon`.
     */
    uncheckedCheckboxIconClassName: PropTypes.string,

    /**
     * Any children used to render the radio checked `FontIcon`.
     */
    checkedRadioIconChildren: PropTypes.node,

    /**
     * An icon className to use to render the radio checked `FontIcon`.
     */
    checkedRadioIconClassName: PropTypes.string,

    /**
     * Any children used to render the radio unchecked `FontIcon`.
     */
    uncheckedRadioIconChildren: PropTypes.node,

    /**
     * An icon className to use to render the radio unchecked `FontIcon`.
     */
    uncheckedRadioIconClassName: PropTypes.string,

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

    /* maybe removed once upgrade again? */
    __superSecreteProp: PropTypes.bool,
  };

  static defaultProps = {
    checkedCheckboxIconChildren: 'check_box',
    uncheckedCheckboxIconChildren: 'check_box_outline_blank',
    checkedRadioIconChildren: 'radio_button_checked',
    uncheckedRadioIconChildren: 'radio_button_unchecked',
  };

  constructor(props) {
    super(props);

    this.state = {};
    if (typeof props.checked === 'undefined') {
      this.state.checked = !!props.defaultChecked;
    }

    this._setInput = this._setInput.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._getIcon = this._getIcon.bind(this);
  }

  _setInput(input) {
    this._input = input;
  }

  _getIcon() {
    const { checkedIcon, uncheckedIcon, type } = this.props;
    const checked = getField(this.props, this.state, 'checked');
    if (checkedIcon || uncheckedIcon) {
      return checked ? checkedIcon : uncheckedIcon;
    }

    const prefix = `${checked ? '' : 'un'}checked${capitalizeFirst(type)}Icon`;
    return (
      <FontIcon iconClassName={this.props[`${prefix}ClassName`]}>
        {this.props[`${prefix}Children`]}
      </FontIcon>
    );
  }

  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    if (key === SPACE) {
      this._input.click();
    }
  }

  _handleChange(e) {
    const { type, onChange } = this.props;
    const checked = !getField(this.props, this.state, 'checked');
    if (onChange) {
      onChange(type === 'radio' ? e.target.value : checked, e);
    }

    if (typeof this.props.checked === 'undefined') {
      this.setState({ checked });
    }
  }

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
      ...props
    } = this.props;
    delete props.label;
    delete props.checked;
    delete props.onChange;
    delete props.checkedIcon;
    delete props.uncheckedIcon;
    delete props.__superSecreteProp;
    delete props.checkedRadioIconChildren;
    delete props.checkedRadioIconClassName;
    delete props.uncheckedRadioIconChildren;
    delete props.uncheckedRadioIconClassName;
    delete props.checkedCheckboxIconChildren;
    delete props.checkedCheckboxIconClassName;
    delete props.uncheckedCheckboxIconChildren;
    delete props.uncheckedCheckboxIconClassName;

    const checked = getField(this.props, this.state, 'checked');
    const isSwitch = type === 'switch';
    const label = this.props.label && <span>{this.props.label}</span>;

    let control;
    if (isSwitch) {
      control = <SwitchTrack disabled={disabled} checked={checked} />;
    } else {
      control = (
        <AccessibleFakeInkedButton
          role={type}
          className={cn('md-selection-control-toggle md-btn md-btn--icon', {
            'md-text--disabled': disabled,
            'md-text--secondary': !disabled && !checked,
            'md-text--theme-secondary': checked && !disabled,
          })}
          aria-checked={checked}
          tabIndex={tabIndex}
          disabled={disabled}
        >
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
        />
        <label
          htmlFor={id}
          className={cn('md-selection-control-label', {
            'md-text md-pointer--hover': !disabled,
            'md-text--disabled': disabled,
          })}
        >
          {labelBefore && label}
          {control}
          {!labelBefore && label}
        </label>
      </div>
    );
  }
}
