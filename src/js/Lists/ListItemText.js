import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `ListItemText` component is used to render the `primaryText` and an optional
 * `secondaryText` for a `ListItem`.
 */
export default class ListItemText extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    activeClassName: PropTypes.string,
    primaryText: PropTypes.node.isRequired,
    secondaryText: PropTypes.node,
    className: PropTypes.string,
    threeLines: PropTypes.bool,
  };

  render() {
    const {
      active,
      activeClassName,
      primaryText,
      secondaryText,
      className,
      threeLines,
      ...props,
    } = this.props;

    let secondaryTextNode;
    if (secondaryText) {
      secondaryTextNode = (
        <div
          className={cn('md-color--secondary-text md-tile-text--secondary', {
            'md-tile-text--three-lines': threeLines,
          })}
        >
          {secondaryText}
        </div>
      );
    }

    return (
      <div {...props} className={cn('md-tile-content', className)}>
        <div
          className={cn('md-tile-text--primary', {
            'md-color--text': !active,
            [activeClassName]: active,
          })}
        >
          {primaryText}
        </div>
        {secondaryTextNode}
      </div>
    );
  }
}
