import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isBetween } from '../utils';

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
export default class LinearProgress extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
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
    value: (props, propName, component, ...others) => {
      if(typeof props[propName] === 'undefined') { return; }
      let err = PropTypes.number(props, propName, component, ...others);
      if(!err) {
        const value = props[propName];
        if(!isBetween(value, 0, 100)) {
          err = new Error(`A determinate '${component}' was given a value '${value}'. The 'value' prop should be between 0 and 100`);
        }
      }

      return err;
    },

    /**
     * Boolean if this should be a query indeterminate progress bar.
     */
    query: PropTypes.bool,
  };

  static defaultProps = {
    query: false,
  };

  render() {
    const { className, value, query, ...props } = this.props;
    const isDeterminate = typeof value === 'number';

    let style;
    if(isDeterminate) {
      style = { width: `${value}%` };
    }

    return (
      <div className={classnames('md-linear-progress-container', className)} {...props}>
        <div
          style={style}
          className={classnames('md-linear-progress', {
            query,
            'determinate': isDeterminate,
            'indeterminate': !isDeterminate,
          })}
        />
      </div>
    );
  }
}
