import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

import between from '../utils/PropTypes/between';

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
  /* eslint-disable max-len */
  static propTypes = {
    /**
     * The `id` prop is required for accessibility concerns.
     * [Progress Bar Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role)
     *
     * > If the progressbar is describing the loading progress of a particular region of a page, the author
     * __SHOULD__ use aria-describedby to point to the status, and set the aria-busy attribute to true on the
     * region until it is finished loading. It is not possible for the user to alter the value of a progressbar
     * because it is always readonly.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /* eslint-enable max-len */

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
    value: between(PropTypes.number, 0, 100),

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
      ...props
    } = this.props;

    const isDeterminate = typeof value === 'number';
    let circleStyle;
    let svgStyle = style;
    if (isDeterminate) {
      const rotate = `rotate3d(0, 0, 1, ${ROATE_DISTANCE / 100 * value}deg)`;
      circleStyle = {
        strokeDashoffset: determinateDashoffset - (determinateDashoffset / 100 * value),
      };

      svgStyle = Object.assign({}, style, {
        WebkitTransform: cn(style.WebkitTransform, rotate),
        MozTransform: cn(style.MozTransform, rotate),
        transform: cn(style.transform, rotate),
      });
    }

    const accessibilityProps = {
      role: 'progressbar',
      'aria-valuemin': 0,
      'aria-valuemax': 100,
    };

    if (isDeterminate) {
      accessibilityProps['aria-valuenow'] = value;
    }

    return (
      <svg
        {...props}
        {...accessibilityProps}
        style={svgStyle}
        className={cn('md-progress md-progress--circular', {
          'md-block-centered': centered,
          'md-progress--circular-determinate': isDeterminate,
          'md-progress--circular-indeterminate': !isDeterminate,
        }, className)}
        width={scale * BASE_SIZE}
        height={scale * BASE_SIZE}
        viewBox="0 0 66 66"
      >
        <circle
          className={cn('md-circular-progress-path', {
            'md-circular-progress-path--animated': !isDeterminate,
          })}
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
