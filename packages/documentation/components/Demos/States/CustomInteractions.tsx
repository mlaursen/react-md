import React, { FC } from "react";
import { Button } from "@react-md/button";

import "./custom-interactions.scss";

const CustomInteractions: FC = () => (
  <Button
    id="custom-state-button"
    enablePressedAndRipple
    className="custom-state-button"
  >
    Button
  </Button>
);

export default CustomInteractions;
