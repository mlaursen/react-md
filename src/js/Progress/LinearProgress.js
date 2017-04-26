import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';
import between from '../utils/PropTypes/between';

/**
 * There are 3 different types of linear progress bars: `Determinate`,
 * `Indeterminate`, and `Query Indeterminate`.
 *
 * A `Determinate` linear progress bar should be used when you can keep track of the
 * progress and have a percentage complete you can work with. An example would be
 * uploading/downloading a file.
 *
 * An `Indeterminate` linear progress bar should be used when you can not keep track
 * of the progess yourself. An example might be waiting for an API call to complete.
 *
 * A `Query Indeterminate` linear progress bar is used when you are combining
 * `Indeterminate` and `Determinate`. A Linear Progress component can be displayed
 * as a query indeterminate progress bar by adding the prop `query={true}` to the
 * component. Until a progress value is given, it will display the query linear
 * progress animation. Afterwards, it will start the determinate animation of where
 * you manually keep updating the value of the progress.
 */
export default class LinearProgress extends PureComponent {
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
     * An optional className to apply to the linear progress container.
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
     * Boolean if this should be a query indeterminate progress bar.
     */
    query: PropTypes.bool,

    /**
     * Boolean if the Linear Progress should be centered. This
     * will only work if the `max-width` style is set.
     */
    centered: PropTypes.bool,
  };

  static defaultProps = {
    query: false,
  };

  render() {
    const { className, value, query, centered, ...props } = this.props;
    const isDeterminate = typeof value === 'number';

    const accessibilityProps = {
      role: 'progressbar',
      'aria-valuemin': 0,
      'aria-valuemax': 100,
    };

    let style;
    if (isDeterminate) {
      style = { width: `${value}%` };
      accessibilityProps['aria-valuenow'] = value;
    }

    return (
      <div
        {...props}
        className={cn('md-progress md-progress--linear', { 'md-block-centered': centered }, className)}
      >
        <div
          {...accessibilityProps}
          style={style}
          className={cn('md-progress--linear-active', {
            'md-progress--linear-query': query,
            'md-progress--linear-determinate': isDeterminate,
            'md-progress--linear-indeterminate': !isDeterminate,
          })}
        />
      </div>
    );
  }
}
