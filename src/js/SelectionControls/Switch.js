import React, { PureComponent, PropTypes } from 'react';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import controlled from '../utils/PropTypes/controlled';
import SelectionControl from './SelectionControl';

export default class Switch extends PureComponent {
  static propTypes = {
    /**
     * An id to use with the switch. This is used for accessibility and so that the label
     * triggers the switch toggle.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),

    /**
     * An optional style to apply to the switch's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the switch's container.
     */
    className: PropTypes.string,

    /**
     * A label to display with the switch. This is required for accessibility and triggering
     * the toggle.
     */
    label: PropTypes.node,

    /**
     * Boolean if the label should appear before the switch.
     */
    labelBefore: PropTypes.bool,

    /**
     * A name to use for the `Switch`. This is required for accessibility since behind the scenes
     * the `Switch` is renders as an `<input type="checkbox" />`.
     */
    name: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * Boolean if the `Switch` is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional function to call when the `checked` state of the `Switch` changes.
     * The callback will incude the new checked state and the changeEvent.
     *
     * ```js
     * onChange(changeEvent.target.checked, changeEvent);
     * ```
     */
    onChange: PropTypes.func,

    /**
     * An optional value for the `Switch`. It is recommended to use a value though.
     */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * Boolean if the `Switch` is checked by default.
     */
    defaultChecked: PropTypes.bool,

    /**
     * A boolean if the `Switch` is currently checked. This will required the `onChange` prop
     * to be defined.
     */
    checked: controlled(PropTypes.bool, 'onChange', 'defaultChecked'),

    defaultToggled: deprecated(PropTypes.bool, 'Use the `defaultChecked` prop instead'),
    toggled: deprecated(PropTypes.bool, 'Use the `checked` prop instead'),
  };

  render() {
    const {
      toggled,
      defaultToggled,
      ...props
    } = this.props;

    if (typeof toggled !== 'undefined' && typeof props.checked === 'undefined') {
      props.checked = toggled;
    }

    if (typeof defaultToggled !== 'undefined' && typeof props.defaultChecked === 'undefined') {
      props.defaultChecked = defaultToggled;
    }

    return <SelectionControl type="switch" {...props} __superSecreteProp />;
  }
}
