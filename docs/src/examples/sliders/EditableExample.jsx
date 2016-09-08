import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons';
import Slider from 'react-md/lib/Sliders';

import './_editable-example.scss';

export default class EditableExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      r: 10,
      g: 188,
      b: 212,
    };

    this._updateR = this._updateR.bind(this);
    this._updateG = this._updateG.bind(this);
    this._updateB = this._updateB.bind(this);
    this._openColorChanger = this._openColorChanger.bind(this);
    this._closeColorChanger = this._closeColorChanger.bind(this);
  }

  _openColorChanger() {
    this.setState({ isOpen: true });
  }

  _closeColorChanger() {
    this.setState({ isOpen: false });
  }

  _updateR(r) {
    this.setState({ r });
  }

  _updateG(g) {
    this.setState({ g });
  }

  _updateB(b) {
    this.setState({ b });
  }

  render() {
    const { r, g, b, isOpen } = this.state;
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
          isOpen={isOpen}
          isSimple={false}
          close={this._closeColorChanger}
          dialogClassName="color-changer-dialog"
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
