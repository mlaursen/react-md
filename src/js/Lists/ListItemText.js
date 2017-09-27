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
    primaryTextStyle: PropTypes.object,
    primaryTextClassName: PropTypes.string,
    secondaryText: PropTypes.node,
    secondaryTextStyle: PropTypes.object,
    secondaryTextClassName: PropTypes.string,
    className: PropTypes.string,
    threeLines: PropTypes.bool,
  };

  render() {
    const {
      active,
      activeClassName,
      disabled,
      primaryText,
      primaryTextStyle,
      primaryTextClassName,
      secondaryText,
      secondaryTextStyle,
      secondaryTextClassName,
      className,
      threeLines,
      ...props
    } = this.props;

    let secondaryTextNode;
    if (secondaryText) {
      secondaryTextNode = (
        <div
          style={secondaryTextStyle}
          className={cn('md-tile-text--secondary', {
            'md-tile-text--three-lines': threeLines,
          }, themeColors({ disabled, hint: !disabled }), secondaryTextClassName)}
        >
          {secondaryText}
        </div>
      );
    }

    return (
      <div {...props} className={cn('md-tile-content', className)}>
        <div
          style={primaryTextStyle}
          className={cn('md-tile-text--primary', {
            [activeClassName]: !disabled && active,
          }, themeColors({ disabled, text: !active }), primaryTextClassName)}
        >
          {primaryText}
        </div>
        {secondaryTextNode}
      </div>
    );
  }
}
