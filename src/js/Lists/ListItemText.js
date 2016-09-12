import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

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
          className={cn('md-text-color--secondary md-tile-text--secondary', {
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
            'md-text-color': !active,
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
