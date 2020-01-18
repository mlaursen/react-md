import React, { FC } from "react";
import Code from "components/Code/Code";

import "./AllElevations.scss";

const AllElevations: FC = () => (
  <ul className="elevations-container">
    {Array.from(new Array(25)).map((_, elevation) => (
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
