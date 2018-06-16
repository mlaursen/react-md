import React, { PureComponent } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { injectInk } from 'react-md';

import './_styles.scss';

/**
 * Starting with React 16, Stateless functions are no longer allowed refs, but the injectInk relies
 * on a ref, so just use `Component` or `PureComponent` to get it to work.
 */
class Button extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    ink: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { ink, className, children, ...props } = this.props;

    return (
      <button type="button" className={cn('button', className)} {...props}>
        {ink}
        {children}
      </button>
    );
  }
}

const InkedButton = injectInk(Button);

const Simple = () => (
  <div className="inks__examples">
    <InkedButton>Hello, World!</InkedButton>
    <InkedButton disabled>Disabled button</InkedButton>
    <InkedButton inkDisabled>Only ink disabled</InkedButton>
    <InkedButton disabledInteractions={['mouse', 'keyboard']}>
      Disable desktop inks
    </InkedButton>
  </div>
);

export default Simple;
