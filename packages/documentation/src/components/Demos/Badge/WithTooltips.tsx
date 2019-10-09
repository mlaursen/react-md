import React, { FC, Fragment } from "react";
import TooltippedBadgedButton from "./TooltippedBadgedButton";

import "./SimpleExamples.scss";

const WithTooltips: FC = () => (
  <Fragment>
    <TooltippedBadgedButton
      id="tooltipped-badged-button-1"
      tooltip="No Alerts"
      className="badge-container"
    />
    <TooltippedBadgedButton
      id="tooltipped-badged-button-2"
      tooltip="10 New Alerts"
      className="badge-container"
    >
      10
    </TooltippedBadgedButton>
    <TooltippedBadgedButton
      id="tooltipped-badged-button-3"
      tooltip="100 New Alerts"
      className="badge-container"
    >
      99+
    </TooltippedBadgedButton>
  </Fragment>
);

export default WithTooltips;
