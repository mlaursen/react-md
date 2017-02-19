import React, { PureComponent, PropTypes } from 'react';
import TextField from 'react-md/lib/TextFields';

const MIN_WIDTH = 180;
const MAX_WIDTH = 375;

export default class AutogrowingTextField extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    desktop: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { style: { width: MIN_WIDTH } };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.desktop !== nextProps.desktop) {
      this._style = window.getComputedStyle(this._field);
    }
  }

  _init = (field) => {
    if (field) {
      this._field = field.getField();
      this._style = window.getComputedStyle(this._field);
      this._canvas = document.createElement('canvas');
    }
  };

  _resize = (value) => {
    const context = this._canvas.getContext('2d');
    context.font = this._style.font;
    const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, context.measureText(value).width));

    if (this.state.style.width !== width) {
      this.setState({ style: { width } });
    }
  };

  render() {
    const { className } = this.props;
    return (
      <TextField
        id="document-title"
        className={className}
        block
        ref={this._init}
        style={this.state.style}
        customSize="docs-title"
        placeholder="Untitled Document"
        onChange={this._resize}
      />
    );
  }
}
