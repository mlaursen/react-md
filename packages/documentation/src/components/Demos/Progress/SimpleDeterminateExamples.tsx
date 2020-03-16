import React, { FC } from "react";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { CloudDownloadSVGIcon } from "@react-md/material-icons";
import {
  CircularProgress,
  getProgressA11y,
  LinearProgress,
} from "@react-md/progress";

import "./SimpleDeterminateExample.scss";
import useDownloadInterval from "./useDownloadInterval";

const Container: FC = ({ children }) => (
  <div className="determinate-example-container">{children}</div>
);

const SimpleDeterminateExamples: FC = () => {
  const {
    value: value1,
    running: running1,
    start: start1,
  } = useDownloadInterval();
  const {
    value: value2,
    running: running2,
    start: start2,
  } = useDownloadInterval();

  return (
    <>
      <Container>
        <Button
          id="determinate-linear-example-toggle"
          onClick={start1}
          theme="primary"
          themeType="outline"
          disabled={running1}
          {...getProgressA11y("determinate-circular-progress", running1)}
        >
          <TextIconSpacing icon={<CloudDownloadSVGIcon />}>
            Download
          </TextIconSpacing>
        </Button>
        <LinearProgress
          id="determinate-linear-progress"
          className="determinate-example-linear"
          value={value1}
        />
      </Container>
      <Container>
        <Button
          id="determinate-example-toggle"
          onClick={start2}
          theme="primary"
          themeType="outline"
          disabled={running2}
          {...getProgressA11y("determinate-circular-progress", running2)}
        >
          <TextIconSpacing icon={<CloudDownloadSVGIcon />}>
            Download
          </TextIconSpacing>
        </Button>
        <CircularProgress
          id="determinate-circular-progress"
          value={value2}
          centered={false}
          className="determinate-example-circular"
        />
      </Container>
    </>
  );
};

export default SimpleDeterminateExamples;
