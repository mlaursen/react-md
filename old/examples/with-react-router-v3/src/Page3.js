import React, { Component } from 'react';
import Slider from 'react-md/lib/Sliders';

export default class Page3 extends Component {
  render() {
    return (
      <div className="md-grid">
        <h2 className="md-cell md-cell--12 md-text-container">
          Page 3
        </h2>
        <Slider id="page-3-slider" className="md-cell md-cell--12" />
      </div>
    );
  }
}
