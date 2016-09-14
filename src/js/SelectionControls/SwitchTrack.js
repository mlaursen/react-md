import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import SwitchThumb from './SwitchThumb';

export default class SwitchTrack extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };

  render() {
    const { disabled, checked, className, onFocus, onBlur, ...props } = this.props;
    return (
      <div
        {...props}
        className={cn('md-switch-track', {
          'md-selection-control--cursor': !disabled,
          'md-switch-track--disabled': disabled,
          'md-switch-track--on': checked,
          'md-switch-track--off': !checked,
        }, className)}
      >
        <SwitchThumb onFocus={onFocus} onBlur={onBlur} disabled={disabled} checked={checked} />
      </div>
    );
  }
}
