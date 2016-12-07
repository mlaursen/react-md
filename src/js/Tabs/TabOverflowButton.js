import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import Button from '../Buttons/Button';

export default class TabOverflowButton extends PureComponent {
  static propTypes = {
    left: PropTypes.bool,
    icon: PropTypes.bool,
  };

  render() {
    const { left, icon, ...props } = this.props;
    return (
      <Button
        {...props}
        icon
        className={cn('md-icon--inherit md-btn--tab-overflow', {
          'md-btn--tab-overflow-left': left,
          'md-btn--tab-overflow-right': !left,
          'md-btn--tab-overflow-icon': icon,
        })}
      />
    );
  }
}
