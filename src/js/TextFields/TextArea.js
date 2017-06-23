import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ResizeObserver from 'resize-observer-polyfill';

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
    label: PropTypes.node,
    setContainerRef: PropTypes.func,
  };

  constructor() {
    super();
    this.state = { height: null };
    this._resizeObserver = new ResizeObserver(this._handleResize);
  }

  componentDidMount() {
    this._rowHeight = this._calcRowHeight();
    this._syncHeightWithMask();
    this._resizeObserver.observe(this._container);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rows !== nextProps.rows) {
      this._rowHeight = this._calcRowHeight();
    }

    if (this.props.value !== nextProps.value || this.props.maxRows !== nextProps.maxRows) {
      this._syncHeightWithMask(nextProps.value);
    }
  }

  componentWillUnmount() {
    this._resizeObserver.disconnect();
  }

  getField = () => this._field;

  getValue = () => this._field.value;

  focus = () => {
    this._field.focus();
  };

  blur = () => {
    this._field.blur();
  };

  _calcRowHeight() {
    return this._mask.offsetHeight / this.props.rows;
  }

  _setMask = (mask) => {
    this._mask = mask;
  };

  _setField = (field) => {
    this._field = field;
  };

  _setContainer = (container) => {
    this._container = container;
    if (this.props.setContainerRef) {
      this.props.setContainerRef(container);
    }
  };

  _handleResize = () => {
    this._rowHeight = this._calcRowHeight();
    this._syncHeightWithMask();
  };

  _syncHeightWithMask = (value) => {
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
  };

  _handleChange = (e) => {
    this._syncHeightWithMask(e.target.value, e);

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    const { height } = this.state;

    const {
      style,
      defaultValue,
      value,
      className,
      label,
      block,
      /* eslint-disable no-unused-vars */
      maxRows,
      onChange,
      onHeightChange,
      setContainerRef,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    return (
      <div
        style={{ height: height && height + 5 }}
        ref={this._setContainer}
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
