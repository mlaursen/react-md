import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import FlatButton from '../Buttons/FlatButton';

export default class Toast extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    toast: PropTypes.shape({
      text: PropTypes.string.isRequired,
      action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          onClick: PropTypes.func.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ]),
    }).isRequired,
    dismiss: PropTypes.func.isRequired,
    multiline: PropTypes.bool,
  };

  render() {
    const { className, toast, dismiss, multiline, ...props } = this.props;
    const { text, action } = toast;
    let btnProps = action;
    if (typeof action === 'string') {
      btnProps = {
        label: action,
        onClick: dismiss,
      };
    }

    return (
      <section
        {...props}
        className={cn('md-snackbar', className, { multiline })}
      >
        <p>{text}</p>
        {action && <FlatButton {...btnProps} />}
      </section>
    );
  }
}
