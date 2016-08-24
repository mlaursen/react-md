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
    ink: PropTypes.node,
    disabled: PropTypes.bool,
  };

  render() {
    const { inputClassName, below, open, ink, ...props } = this.props;
    delete props.inkDisabled;

    const control = (
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

    return ink ? <div>{control}{ink}</div> : control;
  }
}

export default injectInk(SelectFieldControl);
