import React, { FC } from "react";

import "./AnimatingElevation.scss";

const AnimatingElevation: FC = () => (
  <div className="animating-elevation-container">
    <button
      id="animating-elevation-1"
      type="button"
      className="animating-elevation animating-elevation--1"
    >
      This button will animate elevation when the button is hovered or focused.
    </button>
    <button
      id="animating-elevation-2"
      type="button"
      className="animating-elevation animating-elevation--2"
    >
      This button will animate elevation when hovered, as well as a custom focus
      effect that merges box shadows.
    </button>
  </div>
);

export default AnimatingElevation;
