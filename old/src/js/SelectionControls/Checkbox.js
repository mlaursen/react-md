import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import controlled from '../utils/PropTypes/controlled';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import FontIcon from '../FontIcons/FontIcon';
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
     * The callback will include the new checked state and the changeEvent.
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
      PropTypes.bool,
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
     * The icon to display when the checkbox is checked.
     */
    checkedIcon: PropTypes.node,

    /**
     * The icon to display when the checkbox is unchecked.
     */
    uncheckedIcon: PropTypes.node,

    checkedIconChildren: deprecated(PropTypes.node, 'Use `checkedIcon` instead'),
    checkedIconClassName: deprecated(PropTypes.string, 'Use `checkedIcon` instead'),
    uncheckedIconChildren: deprecated(PropTypes.node, 'Use `uncheckedIcon` instead'),
    uncheckedIconClassName: deprecated(PropTypes.string, 'Use `uncheckedIcon` instead'),
  };

  static defaultProps = {
    checkedIcon: <FontIcon>check_box</FontIcon>,
    uncheckedIcon: <FontIcon>check_box_outline_blank</FontIcon>,
  };

  render() {
    const {
      checkedIcon,
      uncheckedIcon,
      // deprecated
      checkedIconChildren,
      checkedIconClassName,
      uncheckedIconChildren,
      uncheckedIconClassName,
      ...props
    } = this.props;

    const checked = getDeprecatedIcon(checkedIconClassName, checkedIconChildren, checkedIcon);
    const unchecked = getDeprecatedIcon(uncheckedIconClassName, uncheckedIconChildren, uncheckedIcon);

    return (
      <SelectionControl
        type="checkbox"
        checkedCheckboxIcon={checked}
        uncheckedCheckboxIcon={unchecked}
        __superSecreteProp
        {...props}
      />
    );
  }
}
