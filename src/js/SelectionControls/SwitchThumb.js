import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';

const disabledInteractions = ['mouse'];

/**
 * This is the `Thumb` for the switch. The `ink` in the Thumb is only active on touch and keyboard
 * interactions, so the `AccessibleFakeInkButton` does not work for this case.
 *
 * This component really just is used for custom inkage.
 */
export default class SwitchThumb extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    const { disabled, checked, className, ...props } = this.props;
    return (
      <AccessibleFakeInkedButton
        {...props}
        disabled={disabled}
        disabledInteractions={disabledInteractions}
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
