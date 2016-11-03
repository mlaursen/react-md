import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `TextArea` component is used to allow a dynamic height for the
 * `textarea`. The height will keep on changing until the maxRows prop
 * is met or infinitely if it does not exist, or is 0.
 */
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
    block: PropTypes.bool,
    label: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = { height: null };
    this.focus = this.focus.bind(this);
    this.getField = this.getField.bind(this);
    this.getValue = this.getValue.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleResize = this._handleResize.bind(this);
    this._syncHeightWithMask = this._syncHeightWithMask.bind(this);
  }

  componentDidMount() {
    this._rowHeight = this._calcRowHeight(this._field, this.props);
    this._syncHeightWithMask();
    window.addEventListener('resize', this._handleResize);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rows !== nextProps.rows) {
      this._rowHeight = this._calcRowHeight(this._field, this.props);
    }

    if (this.props.value !== nextProps.value || this.props.maxRows !== nextProps.maxRows) {
      this._syncHeightWithMask(nextProps.value);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  getField() {
    return this._field;
  }

  getValue() {
    return this._field.value;
  }

  focus() {
    this._field.focus();
  }

  _setMask(mask) {
    this._mask = mask;
  }

  _setField(field) {
    this._field = field;
  }

  _calcRowHeight(field, props) {
    return field.offsetHeight / props.rows;
  }

  _handleResize() {
    this._rowHeight = this._calcRowHeight(this._field, this.props);
    this._syncHeightWithMask();
  }

  _syncHeightWithMask(value) {
    if (value !== undefined) {
      this._mask.value = value;
    }

    let height = this._mask.scrollHeight;
    if (height === undefined) {
      return;
    }

    const { rows, maxRows } = this.props;
    if (maxRows && maxRows > 0) {
      height = Math.min(height, this._rowHeight * maxRows);
    }

    height = Math.max(this._rowHeight * rows, height);

    if (this.props.onHeightChange) {
      // For some reason the md-text-field-multiline-container is 5px
      // larger than the textareas.. So just add 5 here and on the inline style
      this.props.onHeightChange(height + 5);
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
    const { height } = this.state;

    const {
      style,
      defaultValue,
      value,
      className,
      label,
      block,
      ...props
    } = this.props;
    delete props.maxRows;
    delete props.onChange;
    delete props.onHeightChange;

    return (
      <div
        style={{ height: height && height + 5 }}
        className={cn('md-text-field-multiline-container', {
          'md-text-field--margin': !label && !block,
          'md-text-field--floating-margin': label && !block,
        })}
      >
        <textarea
          ref={mask => { this._mask = mask; }}
          className={cn(className, 'md-text-field--multiline-mask')}
          readOnly
          rows={props.rows}
          tabIndex={-1}
          style={style}
          defaultValue={defaultValue}
          aria-hidden
          value={value}
        />
        <textarea
          {...props}
          ref={field => { this._field = field; }}
          style={Object.assign({}, style, { height })}
          className={className}
          defaultValue={defaultValue}
          value={value}
          onChange={this._handleChange}
        />
      </div>
    );
  }
}
