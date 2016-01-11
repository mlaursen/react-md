import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import FontIcon from '../FontIcon';
import Ink from '../Ink';

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
    isOpen: PropTypes.bool.isRequired,
  };

  render() {
    const { label, name, value, isOpen, ...props } = this.props;
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
          <span className="text">{label}</span>
          <FontIcon className={isOpen ? 'flipped' : ''}>arrow_drop_down</FontIcon>
        </div>
        <hr className="md-divider" />
        <Ink key="ink" />
      </button>
    );
  }
}
