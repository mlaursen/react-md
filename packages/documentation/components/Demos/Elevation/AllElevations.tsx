import React, { FunctionComponent } from "react";
import Code from "components/Code/Code";

import "./all-elevations.scss";

const AllElevations: FunctionComponent = () => (
  <ul className="elevations-container">
    {Array.from(new Array(24)).map((_, elevation) => (
      <li
        key={elevation}
        className={`elevation-container elevation-container--${elevation}`}
      >
        <Code className="elevation-container__import">{`@include rmd-elevation(${elevation})`}</Code>
      </li>
    ))}
  </ul>
);

export default AllElevations;
