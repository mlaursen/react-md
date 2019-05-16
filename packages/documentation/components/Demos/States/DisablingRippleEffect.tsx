import React, { FunctionComponent } from "react";
import { StatesConfig } from "@react-md/states";
import { Button } from "@react-md/button";

const DisablingRippleEffect: FunctionComponent = () => (
  <StatesConfig disableRipple>
    <Button id="no-ripple-button-1">Button without ripple</Button>
    <Button id="no-ripple-button-2" disableRipple={false}>
      Button with ripple
    </Button>
  </StatesConfig>
);

export default DisablingRippleEffect;
