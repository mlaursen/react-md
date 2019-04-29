import React, { FunctionComponent, Fragment } from "react";
import { Button } from "@react-md/button";
import { Overlay } from "@react-md/overlay";
import { useToggle } from "@react-md/utils";

const SimpleExample: FunctionComponent = () => {
  const { toggled, toggle, disable } = useToggle();
  return (
    <Fragment>
      <Button id="simple-overlay-button" onClick={toggle} themeType="contained">
        Show Overlay
      </Button>
      <Overlay id="simple-overlay" visible={toggled} onRequestClose={disable} />
    </Fragment>
  );
};

export default SimpleExample;
