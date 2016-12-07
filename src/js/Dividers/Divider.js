import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The divider component will pass all other props such as style or
 * event listeners on to the component.
 */
export default class Divider extends PureComponent {
  static propTypes = {
    /*
     * An optional style to apply to the divider.
     */
    style: PropTypes.object,

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

    const Component = vertical ? 'div' : 'hr';

    return (
      <Component
        {...props}
        className={cn('md-divider', {
          'md-divider--vertical': vertical,
          'md-divider--inset': inset,
        }, className)}
      />
    );
  }
}
