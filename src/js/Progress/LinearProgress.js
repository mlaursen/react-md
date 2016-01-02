import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class LinearProgress extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
  }

  render() {
    const { className, value } = this.props;
    const isDeterminate = typeof value === 'number';
    let style;
    if(isDeterminate) {
      style = { width: `${value}%` };
    }
    return (
      <div className={classnames('md-linear-progress-container', className)}>
        <div
          className={classnames('md-linear-progress', {
            'determinate': isDeterminate,
            'indeterminate': !isDeterminate,
          })}
          style={style}
        />
      </div>
    );
  }
}
