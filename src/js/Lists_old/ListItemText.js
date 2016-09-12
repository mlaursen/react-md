import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class ListItemText extends PureComponent {
  static propTypes = {
    primaryText: PropTypes.node.isRequired,
    secondaryText: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { primaryText, secondaryText, ...props } = this.props;
    const className = cn('md-tile-content', props.className);

    return (
      <div {...props} className={className}>
        <div className="md-tile-primary-text">{primaryText}</div>
        {secondaryText && <div className="md-tile-secondary-text">{secondaryText}</div>}
      </div>
    );
  }
}
