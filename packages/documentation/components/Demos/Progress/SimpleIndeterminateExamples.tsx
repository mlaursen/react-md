import React, { FunctionComponent, Fragment, useEffect } from "react";
import { Button } from "@react-md/button";
import {
  LinearProgress,
  CircularProgress,
  getProgressA11y,
} from "@react-md/progress";
import { useToggle } from "@react-md/utils";

import Phone from "components/Phone";
import "./simple-examples.scss";
import useTemporaryToggle from "./useTemporaryToggle";

const SimpleIndeterminateExamples: FunctionComponent = () => {
  const {
    toggled: linearVisible,
    toggle: toggleLinear,
    disable: disableLinear,
  } = useTemporaryToggle();
  const {
    toggled: circularVisible,
    toggle: toggleCircular,
    disable: disableCircular,
  } = useTemporaryToggle();

  return (
    <Fragment>
      <Phone id="simple-linear" title="Linear" onPhoneClose={disableLinear}>
        {linearVisible && <LinearProgress id="simple-linear-progress" />}
        <Button
          id="show-linear-progress"
          {...getProgressA11y("simple-linear-progress", circularVisible)}
          onClick={toggleLinear}
          themeType="contained"
          className="centered-progress-toggle"
          disabled={linearVisible}
        >
          Toggle Progress
        </Button>
      </Phone>
      <Phone
        id="simple-circular"
        title="Circular"
        onPhoneClose={disableCircular}
      >
        {circularVisible && <CircularProgress id="simple-circular-progress" />}
        <Button
          id="show-circular-progress"
          {...getProgressA11y("simple-circular-progress", circularVisible)}
          onClick={toggleCircular}
          themeType="contained"
          className="centered-progress-toggle"
          disabled={circularVisible}
        >
          Toggle Progress
        </Button>
      </Phone>
    </Fragment>
  );
};

export default SimpleIndeterminateExamples;
