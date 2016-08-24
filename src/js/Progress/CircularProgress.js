import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import { isBetween } from '../utils';

const ROATE_DISTANCE = 360 * 1.75;
const BASE_SIZE = 24; // font-icon font size

/**
 * The `CircularProgress` component is used to give visual feedback while your app
 * is loading.
 *
 * There are two different types of circular progress bars: `Determinate` and `Indeterminate`.
 *
 * A `Determinate` circular progress bar should be used when you want to keep track of the current
 * progress. An example would be downloading a file.
 *
 * An `Indeterminate` circular progress bar should be used when you can not keep track of the progress
 * yourself. An example would be waiting for some API call to complete.
 */
export default class CircularProgress extends PureComponent {
  static propTypes = {
    /**
     * A style object to apply to the svg. If this is a determinate `CircularProgress`,
     * the `transform` (and vendor prefixes) styles will be merged with the current
     * progress rotation.
     */
    style: PropTypes.object.isRequired,

    /**
     * An optional className to apply to the svg.
     */
    className: PropTypes.string,

    /**
     * The current value of the progress. If this value is defined, it will
     * be converted to a determinate circular progress. The progress will not
     * advance unless this value changes.
     *
     * This value should also be a number between 0 and 100.
     */
    value: (props, propName, component, ...others) => {
      if (typeof props[propName] === 'undefined') { return null; }
      let err = PropTypes.number(props, propName, component, ...others);
      if (!err) {
        const value = props[propName];
        if (!isBetween(value, 0, 100)) {
          err = new Error(
            `A determinate '${component}' was given a value '${value}'. The 'value' prop should be between 0 and 100`
          );
        }
      }

      return err;
    },

    /**
     * The scale for the circular progress.
     */
    scale: PropTypes.number.isRequired,

    /**
     * You probably don't want to update this. I'm not good at svg. This should
     * match the scss variable `$md-circular-progress-stroke-dashoffset`.
     */
    determinateDashoffset: PropTypes.number.isRequired,

    /**
     * Boolean if the the progress should be centered in it's container.
     */
    centered: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    scale: 1,
    determinateDashoffset: 187,
    centered: true,
  };

  render() {
    const {
      scale,
      style,
      className,
      value,
      determinateDashoffset,
      centered,
      ...props,
    } = this.props;

    const isDeterminate = typeof value === 'number';
    let circleStyle;
    let svgStyle = style;
    if (isDeterminate) {
      const rotate = `rotate(${ROATE_DISTANCE / 100 * value}deg)`;
      circleStyle = {
        strokeDashoffset: determinateDashoffset - (determinateDashoffset / 100 * value),
      };

      svgStyle = Object.assign({}, style, {
        WebkitTransform: cn(style.WebkitTransform, rotate),
        MozTransform: cn(style.MozTransform, rotate),
        transform: cn(style.transform, rotate),
      });
    }

    return (
      <svg
        {...props}
        style={svgStyle}
        className={cn('md-circular-progress', className, {
          centered,
          'determinate': isDeterminate,
          'indeterminate': !isDeterminate,
        })}
        width={scale * BASE_SIZE}
        height={scale * BASE_SIZE}
        viewBox="0 0 66 66"
      >
        <circle
          className="md-circular-progress-path"
          strokeWidth="6"
          strokeLinecap="round"
          style={circleStyle}
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    );
  }
}
