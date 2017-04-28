import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import Slider from 'react-md/lib/Sliders';

import './_editable-example.scss';

export default class EditableExample extends PureComponent {
  state = {
    visible: false,
    r: 10,
    g: 188,
    b: 212,
  };

  _openColorChanger = () => {
    this.setState({ visible: true });
  };

  _closeColorChanger = () => {
    this.setState({ visible: false });
  };

  _updateR = (r) => {
    this.setState({ r });
  };

  _updateG = (g) => {
    this.setState({ g });
  };

  _updateB = (b) => {
    this.setState({ b });
  };

  render() {
    const { r, g, b, visible } = this.state;
    return (
      <div>
        <Button
          raised
          label="Open Color Changer"
          secondary
          onClick={this._openColorChanger}
          className="margin-centered"
        />
        <Dialog
          id="colorChanger"
          visible={visible}
          onHide={this._closeColorChanger}
          dialogClassName="color-changer-dialog"
          aria-label="Color Changer"
        >
          <header
            className="color-changer"
            style={{ background: `rgb(${r}, ${g}, ${b})` }}
          />
          <Slider
            leftIcon={<span className="md-slider-ind">R</span>}
            value={r}
            onChange={this._updateR}
            max={255}
            editable
          />
          <Slider
            leftIcon={<span className="md-slider-ind">G</span>}
            value={g}
            onChange={this._updateG}
            max={255}
            editable
          />
          <Slider
            leftIcon={<span className="md-slider-ind">B</span>}
            value={b}
            onChange={this._updateB}
            max={255}
            editable
          />
        </Dialog>
      </div>
    );
  }
}
