import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The divider component will pass all other props such as style or
 * event listeners on to the component.
 */
export default class Divider extends PureComponent {
  static propTypes = {
    /**
     * An optional className to apply to the divider.
     */
    className: PropTypes.string,

    /**
     * Boolean if this divider should be inset relative to it's container
     * component. This means that if it is in a `List` with `Avatar`, it
     * will start the divider  to the left of the main text in the list.
     */
    inset: PropTypes.bool,

    /**
     * Boolean if the divider should be vertical instead of horizontal.
     */
    vertical: PropTypes.bool,
  };

  render() {
    const { className, inset, vertical, ...props } = this.props;
    // When in a list
    delete props.expanderIconChildren;
    delete props.expanderIconClassName;

    const dividerProps = {
      ...props,
      role: 'divider',
      className: cn('md-divider', { inset, vertical }, className),
    };

    return React.createElement(vertical ? 'div' : 'hr', dividerProps);
  }
}
