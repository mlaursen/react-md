import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import oneRequiredForA11y from '../utils/PropTypes/oneRequiredForA11y';
import SwitchThumb from './SwitchThumb';

export default class SwitchTrack extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    inkDisabled: PropTypes.bool,
    disabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'touch', 'mouse'])),
    'aria-label': oneRequiredForA11y(PropTypes.string, 'aria-labelledby'),
    'aria-labelledby': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  render() {
    const {
      disabled,
      checked,
      className,
      inkDisabled,
      disabledInteractions,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    } = this.props;
    return (
      <div
        {...props}
        className={cn('md-switch-track', {
          'md-pointer--hover': !disabled,
          'md-switch-track--disabled': disabled,
          'md-switch-track--on': checked,
          'md-switch-track--off': !checked,
        }, className)}
      >
        <SwitchThumb
          disabled={disabled}
          checked={checked}
          onClick={props.onClick}
          inkDisabled={inkDisabled}
          disabledInteractions={disabledInteractions}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        />
      </div>
    );
  }
}
