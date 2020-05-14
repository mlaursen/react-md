import React, { FC } from "react";
import { Button } from "@react-md/button";
import {
  CircularProgress,
  getProgressA11y,
  LinearProgress,
} from "@react-md/progress";

import Phone from "components/Phone";

import useTemporaryToggle from "./useTemporaryToggle";
import styles from "./SimpleDeterminateExamples.module.scss";

const SimpleIndeterminateExamples: FC = () => {
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
    <>
      <Phone id="simple-linear" title="Linear" onPhoneClose={disableLinear}>
        {linearVisible && <LinearProgress id="simple-linear-progress" />}
        <Button
          id="show-linear-progress"
          {...getProgressA11y("simple-linear-progress", circularVisible)}
          onClick={toggleLinear}
          theme="primary"
          themeType="contained"
          className={styles.button}
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
          theme="primary"
          themeType="contained"
          className={styles.button}
          disabled={circularVisible}
        >
          Toggle Progress
        </Button>
      </Phone>
    </>
  );
};

export default SimpleIndeterminateExamples;
