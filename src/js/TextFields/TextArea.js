import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class TextArea extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    rows: PropTypes.number.isRequired,
    maxRows: PropTypes.number,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    floatingLabel: PropTypes.bool,
    value: PropTypes.string,
    onHeightChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = { height: null };
    this._handleChange = this._handleChange.bind(this);
    this._syncHeightWithMask = this._syncHeightWithMask.bind(this);
  }

  componentDidMount() {
    this._syncHeightWithMask();
    window.addEventListener('resize', this._syncHeightWithMask);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this._syncHeightWithMask(nextProps.value);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._syncHeightWithMask);
  }

  _syncHeightWithMask(value) {
    const { mask } = this.refs;
    if (value !== undefined) {
      mask.value = value;
    }

    const height = mask.scrollHeight;
    if (height === undefined) {
      return;
    }

    if (this.props.onHeightChange) {
      this.props.onHeightChange(height);
    }

    this.setState({ height });
  }

  _handleChange(e) {
    this._syncHeightWithMask(e.target.value, e);

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    const {
      style,
      defaultValue,
      value,
      floatingLabel,
      ...props,
    } = this.props;
    delete props.maxRows;
    delete props.className;
    delete props.onChange;
    delete props.onHeightChange;

    let { className } = this.props;
    className = cn('md-text-field md-text-field--multiline', {
      'md-text-field--floating-label-multiline': floatingLabel,
    }, className);

    return (
      <div className="md-text-field-multiline-container">
        <textarea
          ref="mask"
          className={cn(className, 'md-text-field--multiline-mask')}
          readOnly
          rows={props.rows}
          tabIndex={-1}
          style={style}
          defaultValue={defaultValue}
          value={value}
        />
        <textarea
          {...props}
          ref="textField"
          style={Object.assign({}, style, { height: this.state.height })}
          className={className}
          defaultValue={defaultValue}
          value={value}
          onChange={this._handleChange}
        />
      </div>
    );
  }
}
