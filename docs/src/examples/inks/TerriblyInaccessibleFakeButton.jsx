import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import injectInk from 'react-md/lib/Inks';

import './_terribly-inaccessible-fake-button.scss';

@injectInk
export default class TerriblyInaccessibleFakeButton extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,

    // Injected from injectInk
    ink: PropTypes.node,
    // It is required to pass all these event listeners onto your component to
    // get the full ink effect
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onKeyUp: PropTypes.func,
    onBlur: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchCancel: PropTypes.func,
  };

  render() {
    const { ink, children, className, ...props } = this.props;
    return (
      <div
        {...props}
        className={cn('terribly-inaccessible-fake-button', className, {
          'disabled': props.disabled,
        })}
      >
        {ink}
        {children}
      </div>
    );
  }
}
