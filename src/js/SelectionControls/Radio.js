import React, { PureComponent, PropTypes } from 'react';
import deprecated from 'react-prop-types/lib/deprecated';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

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
    label: PropTypes.string.isRequired,

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
     * Any children to use for the checked `FontIcon` of the `Radio`.
     */
    checkedIconChildren: PropTypes.node,

    /**
     * An icon className to use for the checked `FontIcon` of the `Radio`.
     */
    checkedIconClassName: PropTypes.string,

    /**
     * Any children to use for the unchecked `FontIcon` of the `Radio`.
     */
    uncheckedIconChildren: PropTypes.node,

    /**
     * An icon className to use for the unchecked `FontIcon` of the `Radio`.
     */
    uncheckedIconClassName: PropTypes.string,

    checkedIcon: deprecated(
      PropTypes.node,
      'Use the `checkedIconChildren` and `checkedIconClassName` props instead.'
    ),
    uncheckedIcon: deprecated(
      PropTypes.node,
      'Use the `uncheckedIconChildren` and `uncheckedIconClassName` props instead.'
    ),
  };

  static defaultProps = {
    checkedIconChildren: 'radio_button_checked',
    uncheckedIconChildren: 'radio_button_unchecked',
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
        type="radio"
        checkedRadioIconChildren={checkedIconChildren}
        checkedRadioIconClassName={checkedIconClassName}
        uncheckedRadioIconChildren={uncheckedIconChildren}
        uncheckedRadioIconClassName={uncheckedIconClassName}
        __superSecreteProp
        {...props}
      />
    );
  }
}
