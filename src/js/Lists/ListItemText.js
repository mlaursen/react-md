import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';

/**
 * The `ListItemText` component is used to render the `primaryText` and an optional
 * `secondaryText` for a `ListItem`.
 */
export default class ListItemText extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    activeClassName: PropTypes.string,
    disabled: PropTypes.bool,
    primaryText: PropTypes.node.isRequired,
    secondaryText: PropTypes.node,
    className: PropTypes.string,
    threeLines: PropTypes.bool,
  };

  render() {
    const {
      active,
      activeClassName,
      disabled,
      primaryText,
      secondaryText,
      className,
      threeLines,
      ...props
    } = this.props;

    let secondaryTextNode;
    if (secondaryText) {
      secondaryTextNode = (
        <div
          className={cn('md-tile-text--secondary', {
            'md-tile-text--three-lines': threeLines,
          }, themeColors({ disabled, hint: !disabled }))}
        >
          {secondaryText}
        </div>
      );
    }

    return (
      <div {...props} className={cn('md-tile-content', className)}>
        <div
          className={cn('md-tile-text--primary', {
            [activeClassName]: !disabled && active,
          }, themeColors({ disabled, text: !active }))}
        >
          {primaryText}
        </div>
        {secondaryTextNode}
      </div>
    );
  }
}
