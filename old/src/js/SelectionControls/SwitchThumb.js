import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import oneRequiredForA11y from '../utils/PropTypes/oneRequiredForA11y';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';

const DISABLED_INTERACTIONS = ['mouse'];

/**
 * This is the `Thumb` for the switch. The `ink` in the Thumb is only active on touch and keyboard
 * interactions, so the `AccessibleFakeInkedButton` does not work for this case.
 *
 * This component really just is used for custom inkage.
 */
export default class SwitchThumb extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    disabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'touch', 'mouse'])),
    'aria-label': oneRequiredForA11y(PropTypes.string, 'aria-labelledby'),
    'aria-labelledby': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  render() {
    const { disabled, checked, className, disabledInteractions, ...props } = this.props;
    return (
      <AccessibleFakeInkedButton
        {...props}
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        disabledInteractions={disabledInteractions || DISABLED_INTERACTIONS}
        inkContainerClassName="md-ink-container--2x"
        className={cn('md-switch-thumb', {
          'md-switch-thumb--disabled': disabled,
          'md-switch-thumb--on': checked,
          'md-switch-thumb--off': !checked,
        }, className)}
      />
    );
  }
}
