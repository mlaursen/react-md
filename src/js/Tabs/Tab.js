import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    label2: PropTypes.string,
    icon: PropTypes.node,
    onChange: PropTypes.func,
    multiline: PropTypes.bool,
  };

  render() {
    const { className, icon, label, label2, checked, value, onChange, ...props } = this.props;
    return (
      <li
        className={classnames('md-tab', className, { 'active': checked })}
        tabIndex={0}
        {...props}
        >
        <label className={classnames('md-tab-label', { 'multiline': !!label && !!label2, 'with-icon': !!label && !!icon })}>
          {icon}
          {label && <div>{label}</div>}
          {label2 && <div>{label2}</div>}
          <input
            type="radio"
            className="md-tab-control"
            checked={checked}
            value={value}
            onChange={onChange}
          />
        </label>
      </li>
    );
  }
}
