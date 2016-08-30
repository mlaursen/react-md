import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `TextDivider` component renders the divider below the `TextField` component.
 */
export default class TextDivider extends PureComponent {
  static propTypes = {
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    active: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    icon: PropTypes.bool.isRequired,
  };

  render() {
    const { lineDirection, active, error, icon } = this.props;
    const className = cn('md-text-divider', `from-${lineDirection}`, {
      active,
      error,
      'icon-offset': icon,
    });
    return (
      <div className={className} />
    );
  }
}
