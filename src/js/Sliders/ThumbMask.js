import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `ThumbMask` component is used for either:
 *
 *  - rendering the ink behind the `Thumb` component when the `Thumb`
 *  has keyboard focus or touch focus
 *  - rendering a underlay to make the `Track` look broken for disabled
 *  Sliders.
 */
export default class ThumbMask extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    thumbLeft: PropTypes.string.isRequired,
    maskInked: PropTypes.bool,
    dragging: PropTypes.bool,
    discrete: PropTypes.bool,
    leaving: PropTypes.bool,
  };

  render() {
    const {
      style,
      className,
      thumbLeft,
      disabled,
      dragging,
      maskInked,
      discrete,
      leaving,
      ...props
    } = this.props;

    return (
      <span
        {...props}
        style={Object.assign({}, style, { left: thumbLeft })}
        className={cn('md-slider-thumb md-slider-thumb--mask', className, {
          'md-slider-thumb--dragging': dragging,
          'md-slider-thumb--mask-inked': maskInked,
          'md-slider-thumb--mask-disabled': disabled,
          'md-slider-thumb--discrete-mask-inked': maskInked && discrete,
          'md-slider-thumb--discrete-mask-leaving': discrete && leaving,
        })}
      />
    );
  }
}
