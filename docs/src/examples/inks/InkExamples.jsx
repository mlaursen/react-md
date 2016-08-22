import React, { PureComponent, PropTypes } from 'react';

import injectInk from 'react-md/lib/Inks';

@injectInk
class TerriblyInaccessibleFakeButton extends PureComponent {
  static propTypes = {
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
    const { ink, children, ...props } = this.props;
    return (
      <div className={`terribly-inaccessible-fake-button${this.props.disabled ? ' disabled' : ''}`} {...props}>
        {ink}
        {children}
      </div>
    );
  }
}

const InkExamples = () => (
  <div>
    <TerriblyInaccessibleFakeButton>Click me!</TerriblyInaccessibleFakeButton>
    <TerriblyInaccessibleFakeButton tabIndex={0}>Keyboard focus me!</TerriblyInaccessibleFakeButton>
    <TerriblyInaccessibleFakeButton disabled>Click me!</TerriblyInaccessibleFakeButton>
  </div>
);

export default InkExamples;
