/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';
import Slider from 'react-md/lib/Sliders';

import './_editable.scss';

const Indicator = ({ children }) => <span className="md-slider-ind">{children}</span>;

export default class Editable extends PureComponent {
  state = {
    visible: false,
    r: 10,
    g: 188,
    b: 212,
  };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  updateR = (r) => {
    this.setState({ r });
  };

  updateG = (g) => {
    this.setState({ g });
  };

  updateB = (b) => {
    this.setState({ b });
  };

  render() {
    const { visible, r, g, b } = this.state;

    return (
      <div>
        <Button raised secondary onClick={this.show}>
          Open Color Changer
        </Button>
        <Dialog
          id="color-changer"
          visible={visible}
          onHide={this.hide}
          aria-label="Color Changer"
        >
          <header style={{ background: `rgb(${r}, ${g}, ${b})` }} className="sliders__color-preview" />
          <Slider
            id="color-changer-r"
            max={255}
            editable
            value={r}
            onChange={this.updateR}
            leftIcon={<Indicator>R</Indicator>}
          />
          <Slider
            id="color-changer-g"
            max={255}
            editable
            value={g}
            onChange={this.updateG}
            leftIcon={<Indicator>G</Indicator>}
          />
          <Slider
            id="color-changer-b"
            max={255}
            editable
            value={b}
            onChange={this.updateB}
            leftIcon={<Indicator>B</Indicator>}
          />
        </Dialog>
      </div>
    );
  }
}
