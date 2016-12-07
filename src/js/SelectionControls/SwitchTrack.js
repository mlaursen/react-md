import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import SwitchThumb from './SwitchThumb';

export default class SwitchTrack extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
  };

  render() {
    const { disabled, checked, className, ...props } = this.props;
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
        <SwitchThumb disabled={disabled} checked={checked} onClick={props.onClick} />
      </div>
    );
  }
}
