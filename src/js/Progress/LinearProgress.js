import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isBetween } from '../utils';

export default class LinearProgress extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    value: (props, propName, component) => {
      if(typeof props[propName] === 'undefined') { return; }
      let err = PropTypes.number(props, propName, component);
      if(!err) {
        const value = props[propName];
        if(!isBetween(value, 0, 100)) {
          err = new Error(`A determinate '${component}' was given a value '${value}'. The 'value' prop should be between 0 and 100`);
        }
      }

      return err;
    },
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
