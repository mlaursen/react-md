import React, { FunctionComponent, useState, Fragment } from "react";
import { Button } from "@react-md/button";
import { Overlay } from "@react-md/overlay";
import useToggle from "./useToggle";

const SimpleExample: FunctionComponent = () => {
  const { visible, toggle, hide } = useToggle();
  return (
    <Fragment>
      <Button id="simple-overlay-button" onClick={toggle} themeType="contained">
        Show Overlay
      </Button>
      <Overlay id="simple-overlay" visible={visible} onRequestClose={hide} />
    </Fragment>
  );
};

export default SimpleExample;
