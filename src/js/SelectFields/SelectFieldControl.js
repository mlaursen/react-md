import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import TextField from '../TextFields';
import injectInk from '../Inks';

class SelectFieldControl extends PureComponent {
  static propTypes = {
    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    below: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
  };

  render() {
    const { inputClassName, below, open, ...props } = this.props;

    return (
      <TextField
        {...props}
        className={cn('md-select-field-container', {
          'select-field-btn': below,
          'active': below && open,
          'disabled': props.disabled,
        })}
        inputClassName={cn('md-select-field', inputClassName)}
        readOnly
      />
    );
  }
}

export default injectInk(SelectFieldControl);
