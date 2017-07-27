import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import SwitchThumb from './SwitchThumb';

export default class SwitchTrack extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    inkDisabled: PropTypes.bool,
    disabledInteractions: PropTypes.arrayOf(PropTypes.oneOf(['keyboard', 'touch', 'mouse'])),
  };

  render() {
    const { disabled, checked, className, inkDisabled, disabledInteractions, ...props } = this.props;
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
        />
      </div>
    );
  }
}
