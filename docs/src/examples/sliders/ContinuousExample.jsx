import React, { PureComponent } from 'react';
import Slider from 'react-md/lib/Sliders';

export default class ContinuousExample extends PureComponent {
  _handleChange = (value) => {
    this.refs.div.style.background = `rgba(0, 0, 0, ${(value) / 100})`;
  };

  render() {
    return (
      <div>
        <div ref="div" style={{ height: '40px' }}>Slide first slider to change my color</div>
        <Slider onDragChange={this._handleChange} onChange={this._handleChange} />
        <Slider disabled />
        <Slider defaultValue={30} />
      </div>
    );
  }
}
