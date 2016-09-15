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
    ink: PropTypes.node,
  };

  render() {
    const { children, className, ink, ...props } = this.props;
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
