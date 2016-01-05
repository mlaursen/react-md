import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { FontIcon } from '../../../src/js';

export default class SelectFieldButton extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    name: PropTypes.string,
  }

  render() {
    const { label, name, value, ...props } = this.props;
    return (
      <button
        type="button"
        {...props}
        >
        <input
          type="hidden"
          className="md-select-field-input"
          name={name}
          readOnly
          value={value}
        />
        <div className="icon-separator">
          {label}
          <FontIcon>arrow_drop_down</FontIcon>
        </div>
      </button>
    );
  }
}
