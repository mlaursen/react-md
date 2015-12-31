import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

export default class TextField extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { active: false };
    if(!props.valueLink) {
      this.state.value = props.initialValue;
    }
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    valueLink: PropTypes.shape({
      value: PropTypes.string,
      requestChange: PropTypes.func.isRequired,
    }),
    initialValue: PropTypes.string,
    lineDirection: PropTypes.oneOf(['left', 'right', 'center']),
    singleLine: PropTypes.bool,
    type: PropTypes.string,
  }

  static defaultProps = {
    initialValue: '',
    lineDirection: 'center',
    type: 'text',
  }

  handleFocus = () => {
    this.setState({ active: true });
  }

  handleBlur = () => {
    this.setState({ active: false });
  }

  getValueLink = () => {
    return typeof this.props.valueLink === 'object' ? this.props.valueLink : {
      value: this.state.value,
      requestChange: (value) => { this.setState({ value }); },
    };
  }

  getValue = () => {
    return typeof this.props.valueLink === 'object' ? this.props.valueLink.value : this.state.value;
  }

  render() {
    const { className, label, lineDirection, ...props } = this.props;
    const { active } = this.state;
    const isSingleLine = isPropEnabled(props, 'singleLine');
    return (
      <label className={classnames('md-text-field-container', className, { 'single-line': isSingleLine })}>
        {!isSingleLine &&
        <span className={classnames('md-text-field-label', { 'active': active || !!this.getValue() })}>{label}</span>
        }
        <input
          {...props}
          className={classnames('md-text-field', { 'active': active })}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          valueLink={this.getValueLink()}
          placeholder={isSingleLine ? label : ''}
        />
        <div className={classnames('md-text-field-divider', `from-${lineDirection}`, { 'active': active })} />
      </label>
    );
  }
}
