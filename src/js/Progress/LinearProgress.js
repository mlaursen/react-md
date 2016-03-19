import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { numberBetween } from '../utils';

export default class LinearProgress extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
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
      style = { width: `${numberBetween(value, 0, 100)}%` };
    }

    return (
      <div className={classnames('md-linear-progress-container', className)} {...props}>
        <div
          className={classnames('md-linear-progress', {
            query,
            'determinate': isDeterminate,
            'indeterminate': !isDeterminate,
          })}
          style={style}
        />
      </div>
    );
  }
}
