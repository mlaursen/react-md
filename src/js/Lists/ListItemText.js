import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class ListItemText extends PureComponent {
  static propTypes = {
    primaryText: PropTypes.node.isRequired,
    secondaryText: PropTypes.node,
    className: PropTypes.string,
    threeLines: PropTypes.bool,
  };

  render() {
    const { primaryText, secondaryText, className, threeLines, ...props } = this.props;

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
        <div className="md-text-color md-tile-text--primary">{primaryText}</div>
        {secondaryTextNode}
      </div>
    );
  }
}
