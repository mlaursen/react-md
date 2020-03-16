import React, { FC } from "react";
import { BadgedButton } from "@react-md/badge";
import { NotificationsSVGIcon } from "@react-md/material-icons";

import "./SimpleExamples.scss";

const SimpleExamples: FC = () => (
  <>
    <BadgedButton id="badged-button-1" className="badge-container">
      3
    </BadgedButton>
    <BadgedButton
      id="badged-button-2"
      className="badge-container"
      buttonChildren={<NotificationsSVGIcon />}
    >
      7
    </BadgedButton>
    <BadgedButton id="badged-button-3" className="badge-container">
      0
    </BadgedButton>
    <BadgedButton id="badged-button-4" className="badge-container" />
    <BadgedButton
      id="badged-button-5"
      className="badge-container"
      disableNullOnZero
    >
      0
    </BadgedButton>
  </>
);
export default SimpleExamples;
