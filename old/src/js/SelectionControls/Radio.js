import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import FontIcon from '../FontIcons/FontIcon';
import SelectionControl from './SelectionControl';

/**
 * The `Radio` component is used for the selection of a single option from a set. Unfortunately
 * the `Radio` component must always be controlled because of the `FontIcon` toggles and how
 * the `radio` input type works. It is recommended to use the `SelectionControlGroup` component
 * to manage the `radio`.
 */
export default class Radio extends PureComponent {
  static propTypes = {
    /**
     * An id to use with the radio. This is used for accessibility and so that the label
     * triggers the radio toggle.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),

    /**
     * An optional style to apply to the radio's container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the radio's container.
     */
    className: PropTypes.string,

    /**
     * A label to display with the radio. This is required for accessibility and triggering
     * the toggle.
     */
    label: PropTypes.node.isRequired,

    /**
     * Boolean if the label should appear before the radio icon.
     */
    labelBefore: PropTypes.bool,

    /**
     * A name to use for the `Radio`. This is required for accessibility.
     */
    name: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * Boolean if the `Radio` is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * A function to call when the `Radio` triggers the `change` event. The `onChange` callback
     * will include the current value of the checked `radio` and the change event.
     *
     * ```js
     * onChange(changeEvent.target.value, changeEvent);
     * ```
     */
    onChange: PropTypes.func,

    /**
     * The value for the `Radio` component.
     */
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    /**
     * A boolean if the `Radio` is currently checked.
     */
    checked: PropTypes.bool.isRequired,

    /**
     * Boolean if the `Radio` should be displayed inline.
     */
    inline: PropTypes.bool,

    /**
     * The icon to display when the radio is checked/selected.
     */
    checkedIcon: PropTypes.node.isRequired,

    /**
     * The icon to display when the radio is not checked/selected.
     */
    uncheckedIcon: PropTypes.node.isRequired,
    checkedIconChildren: deprecated(PropTypes.node, 'Use `checkedIcon` instead'),
    checkedIconClassName: deprecated(PropTypes.string, 'Use `checkedIcon` instead'),
    uncheckedIconChildren: deprecated(PropTypes.node, 'Use `uncheckedIcon` instead'),
    uncheckedIconClassName: deprecated(PropTypes.string, 'Use `uncheckedIcon` instead'),
  };

  static defaultProps = {
    checkedIcon: <FontIcon>radio_button_checked</FontIcon>,
    uncheckedIcon: <FontIcon>radio_button_unchecked</FontIcon>,
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
        type="radio"
        checkedCheckboxIcon={checked}
        uncheckedCheckboxIcon={unchecked}
        __superSecreteProp
        {...props}
      />
    );
  }
}
