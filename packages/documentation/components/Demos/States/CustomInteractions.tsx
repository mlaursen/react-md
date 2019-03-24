import React, { FunctionComponent } from "react";
import { Button } from "@react-md/button";

import "./custom-interactions.scss";

const CustomInteractions: FunctionComponent = () => (
  <Button
    id="custom-state-button"
    enablePressedAndRipple
    className="custom-state-button"
  >
    Button
  </Button>
);

export default CustomInteractions;
