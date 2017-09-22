import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { UP, DOWN, LEFT, RIGHT } from '../constants/keyCodes';
import getField from '../utils/getField';
import minMaxLoop from '../utils/NumberUtils/minMaxLoop';
import controlled from '../utils/PropTypes/controlled';
import SelectionControl from './SelectionControl';


/**
 * A custom PropTypes validator to make sure that each `control` in the `controls` prop
 * contains the given `propName`, or the `SelectionControlGroup` has defined that prop.
 */
function requiredByAllControls(validator) {
  return function validate(props, propName, component, ...others) {
    let err = validator(props, propName, component, ...others);

    if (!err && typeof props[propName] === 'undefined') {
      const invalids = props.controls.filter(c => !c[propName]).map((_, i) => i);
      if (invalids.length) {
        const invalidPrefix = invalids.length === props.controls.length
          ? 'All `controls`'
          : `The \`controls\` at indexes \`${invalids.join('`, `')}\``;
        const invalidMsg = `${invalidPrefix} are missing the \`${propName}\` prop.`;

        err = new Error(
          `The \`${propName}\` prop is required to make \`${component}\` accessible for users of ` +
          `assistive technologies such as screen readers. Either add the \`${propName}\` to the \`${component}\` ` +
          `or add the \`${propName}\` to each \`control\` in the \`controls\` prop. ${invalidMsg}`
        );
      }
    }

    return err;
  };
}


/**
 * The `SelectionControlGroup` component is used to simplify the generation of a list
 * of `SelectionControl`. Any common props are extracted to this component and passed
 * to the `SelectionControl`.
 */
export default class SelectionControlGroup extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to every `SelectionControl`. This will be merged with any `style`
     * that a `control` might have.
     */
    controlStyle: PropTypes.object,

    /**
     * An optional className to apply to every `SelectionControl`. This will be merged with any
     * `className` that a `control` might have.
     */
    controlClassName: PropTypes.string,

    /**
     * An optional base id to apply to each `SelectionControl`. When this is included, the id for
     * each control will start with this and end with their current index. If this is omitted,
     * each `control` in the `controls` prop *must* have an `id` prop. This is required for
     * accessibility.
     */
    id: requiredByAllControls(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * The type to apply to each `SelectionControl` in the group. Only `checkbox` and `radio` is
     * valid for a grouping.
     */
    type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,

    /**
     * The component to render the `SelectionControlGroup` in. This can only be a valid dom element
     * since it relies on the ref callback to add keyboard accessibility.
     */
    component: PropTypes.string.isRequired,

    /**
     * An optional label to display above the group of `SelectionControl`s.
     */
    label: PropTypes.node,

    /**
     * An optional className to apply to the node surrounding the `label` prop.
     */
    labelClassName: PropTypes.string,

    /**
     * The component to render the optional `label` in.
     */
    labelComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * An optional function to call when any `SelectionControl`'s `checked` state is changed
     * in the group. If the `type` of the group is `radio`, the `value` of the `checked` radio
     * will be given in the callback. If the `type` of the group is `checkbox`, a comma-delimited
     * string of all `checked` checkboxes values will be given.
     *
     * ```js
     * // checkbox
     * onChange('Alpha,Omega', changeEvent);
     *
     * // radio
     * onChange('Omega', changeEvent);
     * ```
     */
    onChange: PropTypes.func,

    /**
     * A name to use for each `SelectionControl` in the group. If the `type` of the group is
     * `checkbox`, the name will be updated to be an array name so that using
     * `document.querySelector('input[name="yourName[]"].value` will give the comma-delimited
     * string of checked checkboxes.
     *
     * It is either required to have this prop set or every `control` in the `controls` prop to
     * have the `name` prop.
     */
    name: requiredByAllControls(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * The default value for the `SelectionControlGroup`. This can either be a single value
     * or a comma-delimited string of checkbox values. When the `type` of the group is `radio`
     * and the group is uncontrolled, it is recommended to set this prop. Otherwise the first
     * value of the `controls` prop will be used as the default value.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional value to use for the `SelectionControlGroup`. This will make the component
     * controlled and require the `onChange` prop to be defined. Like the `defaultValue`, this
     * can either be a single value or a comma-delimited list of checkbox values.
     */
    value: controlled(PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]), 'onChange'),

    /**
     * A list of objects to create the `SelectionControl` components. The shape of the object
     * is the `propTypes` of the `SelectionControl` component, except that `value` prop is
     * now required.
     *
     * The `SelectionControl` will inherit any inheritable props from the `SelectionControlGroup`.
     */
    controls: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
    })).isRequired,

    /**
     * Boolean if the `SelectionControl` should be displayed inline.
     */
    inline: PropTypes.bool,

    /**
     * Boolean if all the selection controls in the group are disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional function to call when the keydown event is triggered.
     */
    onKeyDown: PropTypes.func,

    /**
     * An icon to use for a checked `radio` control. This will be applied to each
     * control that has a `type="radio"` in the `controls` list. This is just a simpler
     * way of applying the custom icons for each radio in the list.
     *
     * This will default to the `checkedRadioIcon` on the `SelectionControl`.
     *
     * @see {@link #controls}
     * @see {@link #uncheckedRadioIcon}
     * @see {@link SelectionControls/SelectionControls#checkedRadioIcon}
     * @see {@link SelectionControls/SelectionControls#uncheckedRadioIcon}
     */
    checkedRadioIcon: PropTypes.node,

    /**
     * An icon to use for an unchecked `radio` control. This will be applied to each
     * control that has a `type="radio"` in the `controls` list. This is just a simpler
     * way of applying the custom icons for each radio in the list.
     *
     * This will default to the `uncheckedRadioIcon` on the `SelectionControl`.
     *
     * @see {@link #controls}
     * @see {@link #checkedRadioIcon}
     * @see {@link SelectionControls/SelectionControls#checkedRadioIcon}
     * @see {@link SelectionControls/SelectionControls#uncheckedRadioIcon}
     */
    uncheckedRadioIcon: PropTypes.node,

    /**
     * An icon to use for a checked `checkbox` control. This will be applied to each
     * control that has a `type="checkbox"` in the `controls` list. This is just a simpler
     * way of applying the custom icons for each checkbox in the list.
     *
     * This will default to the `checkedCheckboxIcon` on the `SelectionControl`.
     *
     * @see {@link #controls}
     * @see {@link #uncheckedCheckboxIcon}
     * @see {@link SelectionControls/SelectionControls#checkedCheckboxIcon}
     * @see {@link SelectionControls/SelectionControls#uncheckedCheckboxIcon}
     */
    checkedCheckboxIcon: PropTypes.node,

    /**
     * An icon to use for an unchecked `checkbox` control. This will be applied to each
     * control that has a `type="checkbox"` in the `controls` list. This is just a simpler
     * way of applying the custom icons for each checkbox in the list.
     *
     * This will default to the `uncheckedCheckboxIcon` on the `SelectionControl`.
     *
     * @see {@link #controls}
     * @see {@link #checkedCheckboxIcon}
     * @see {@link SelectionControls/SelectionControls#checkedCheckboxIcon}
     * @see {@link SelectionControls/SelectionControls#uncheckedCheckboxIcon}
     */
    uncheckedCheckboxIcon: PropTypes.node,
  };

  static defaultProps = {
    component: 'fieldset',
    labelComponent: 'legend',
    labelClassName: 'md-subheading-1',
  };

  constructor(props) {
    super(props);

    const radio = props.type === 'radio';
    this.state = {};

    if (typeof props.value === 'undefined') {
      let value = props.defaultValue;

      if (typeof value === 'undefined') {
        value = radio ? props.controls[0].value : '';
      }

      this.state.value = value;
    }

    const groupValue = getField(props, this.state, 'value');
    this._activeIndex = -1;
    props.controls.some(({ value }, i) => {
      if (value === groupValue) {
        this._activeIndex = i;
      }

      return this._activeIndex > -1;
    });
  }

  _isChecked(value, controlValue, type) {
    return type === 'radio'
      ? value === controlValue
      : value.split(',').indexOf(controlValue) !== -1;
  }

  _setGroup = (group) => {
    this._group = group;
  };

  _handleChange = (e) => {
    let value = e.target.value;
    if (this.props.type === 'checkbox') {
      const { checked } = e.target;

      const values = getField(this.props, this.state, 'value').split(',');
      const index = values.indexOf(value);
      if (checked) {
        values.push(value);
      } else {
        values.splice(index, 1);
      }

      value = values.join(',');
    }

    if (this.props.onChange) {
      this.props.onChange(value, e);
    }

    if (typeof this.props.value === 'undefined') {
      this.setState({ value });
    }
  };

  _handleKeyDown = (e) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    const dec = key === UP || key === LEFT;
    const inc = key === DOWN || key === RIGHT;
    if (!this._group || (!dec && !inc)) {
      return;
    }

    e.preventDefault();
    const radios = this._group.querySelectorAll('*[role="radio"]');
    this._activeIndex = minMaxLoop(this._activeIndex, 0, radios.length - 1, inc);
    radios[this._activeIndex].focus();
    const { value } = this.props.controls[this._activeIndex];
    if (getField(this.props, this.state, 'value') !== value) {
      if (this.props.onChange) {
        this.props.onChange(value, e);
      }

      if (typeof this.props.value === 'undefined') {
        this.setState({ value });
      }
    }
  };

  render() {
    const {
      id,
      name,
      type,
      label,
      labelClassName,
      className,
      controlStyle,
      controlClassName,
      component: Component,
      labelComponent: LabelComponent,
      inline,
      disabled,
      checkedRadioIcon,
      uncheckedRadioIcon,
      checkedCheckboxIcon,
      uncheckedCheckboxIcon,
      /* eslint-disable no-unused-vars */
      value: propValue,
      controls: propControls,
      defaultValue,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const value = getField(this.props, this.state, 'value');
    const radio = type === 'radio';

    const controls = this.props.controls.map((control, i) => {
      let style = control.style;
      if (controlStyle) {
        style = style ? { ...controlStyle, ...style } : controlStyle;
      }

      const checked = this._isChecked(value, control.value, type);
      const controlProps = {
        id: `${id}${i}`,
        key: `control${i}`,
        name: `${name}${type === 'checkbox' ? '[]' : ''}`,
        type,
        inline,
        disabled,
        checked,
        tabIndex: !radio || checked || (i === 0 && this._activeIndex === -1) ? undefined : -1,
        checkedRadioIcon,
        uncheckedRadioIcon,
        checkedCheckboxIcon,
        uncheckedCheckboxIcon,
        ...control,
        style,
        className: cn(controlClassName, control.className),
      };

      return <SelectionControl {...controlProps} />;
    });

    let ariaLabel;
    if (label) {
      ariaLabel = <LabelComponent className={labelClassName}>{label}</LabelComponent>;
    }

    return (
      <Component
        {...props}
        ref={this._setGroup}
        className={cn('md-selection-control-group', className)}
        onChange={this._handleChange}
        onKeyDown={radio ? this._handleKeyDown : null}
      >
        {ariaLabel}
        {controls}
      </Component>
    );
  }
}
