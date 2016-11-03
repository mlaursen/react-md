import React, { PureComponent, PropTypes } from 'react';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import controlled from '../utils/PropTypes/controlled';
import SelectionControl from './SelectionControl';

/**
 * The `Checkbox` component is used for the selection of multiple options from a set.
 */
export default class Checkbox extends PureComponent {
  static propTypes = {
    /**
     * An id to use with the checkbox. This is used for accessibility and so that the label
     * triggers the checkbox toggle.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),

    /**
     * An optional style to apply to the checkbox's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the checkbox's container.
     */
    className: PropTypes.string,

    /**
     * A label to display with the checkbox. This is required for accessibility and triggering
     * the toggle.
     */
    label: PropTypes.node,

    /**
     * Boolean if the label should appear before the checkbox icon.
     */
    labelBefore: PropTypes.bool,

    /**
     * A name to use for the `Checkbox`. This is required for accessibility. If the checkbox is
     * part of a group, it is recommended to make this a string ending in `[]` so that the
     * value can be found from `document.querySelector('input[name="someName[]"]').value`.
     */
    name: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * Boolean if the `Checkbox` is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional function to call when the `checked` state of the `Checkbox` changes.
     * The callback will incude the new checked state and the changeEvent.
     *
     * ```js
     * onChange(changeEvent.target.checked, changeEvent);
     * ```
     */
    onChange: PropTypes.func,

    /**
     * An optional value for the `Checkbox`. It is recommended to use a value though.
     */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * Boolean if the `Checkbox` is checked by default.
     */
    defaultChecked: PropTypes.bool,

    /**
     * A boolean if the `Checkbox` is currently checked. This will required the `onChange` prop
     * to be defined.
     */
    checked: controlled(PropTypes.bool, 'onChange', 'defaultChecked'),

    /**
     * Boolean if the `Checkbox` should be displayed inline.
     */
    inline: PropTypes.bool,

    /**
     * Any children to use for the checked `FontIcon` of the `Checkbox`.
     */
    checkedIconChildren: PropTypes.node,

    /**
     * An icon className to use for the checked `FontIcon` of the `Checkbox`.
     */
    checkedIconClassName: PropTypes.string,

    /**
     * Any children to use for the unchecked `FontIcon` of the `Checkbox`.
     */
    uncheckedIconChildren: PropTypes.node,

    /**
     * An icon className to use for the unchecked `FontIcon` of the `Checkbox`.
     */
    uncheckedIconClassName: PropTypes.string,

    checkedIcon: deprecated(
      PropTypes.node,
      'Use the `checkedIconChildren` and `checkedIconClassName` props instead'
    ),
    uncheckedIcon: deprecated(
      PropTypes.node,
      'Use the `uncheckedIconChildren` and `uncheckedIconClassName` props instead'
    ),
  };

  static defaultProps = {
    checkedIconChildren: 'check_box',
    uncheckedIconChildren: 'check_box_outline_blank',
  };

  render() {
    const {
      checkedIconChildren,
      checkedIconClassName,
      uncheckedIconChildren,
      uncheckedIconClassName,
      ...props
    } = this.props;

    return (
      <SelectionControl
        type="checkbox"
        checkedCheckboxIconChildren={checkedIconChildren}
        checkedCheckboxIconClassName={checkedIconClassName}
        uncheckedCheckboxIconChildren={uncheckedIconChildren}
        uncheckedCheckboxIconClassName={uncheckedIconClassName}
        __superSecreteProp
        {...props}
      />
    );
  }
}
