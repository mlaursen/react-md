import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class TrackFill extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    dragging: PropTypes.bool,
    disabled: PropTypes.bool,
    trackFillWidth: PropTypes.string.isRequired,
  };

  render() {
    const { style, className, trackFillWidth, dragging, disabled, ...props } = this.props;
    if (disabled) {
      return null;
    }

    return (
      <hr
        {...props}
        style={Object.assign({}, style, { width: trackFillWidth })}
        className={cn('md-slider-track-fill', className, {
          'md-slider-track-fill--dragging': dragging,
        })}
      />
    );
  }
}
