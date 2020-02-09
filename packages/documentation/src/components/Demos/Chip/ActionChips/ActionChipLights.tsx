import React, { FC, useEffect, useState } from "react";
import {
  BrightnessHighSVGIcon,
  BrightnessLowSVGIcon,
} from "@react-md/material-icons";
import { CircularProgress, getProgressA11y } from "@react-md/progress";

import { randomInt } from "utils/random";

import ActionChip from "./ActionChip";

const id = "action-chip-lights";
const progressId = `${id}-progress`;

const ActionChipLights: FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setLoading(false);
      setEnabled(prevEnabled => !prevEnabled);
    }, randomInt({ min: 3, max: 5 }) * 1000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loading]);

  let leftIcon = enabled ? <BrightnessHighSVGIcon /> : <BrightnessLowSVGIcon />;
  if (loading) {
    leftIcon = <CircularProgress id={progressId} centered={false} />;
  }

  return (
    <ActionChip
      id={id}
      {...getProgressA11y(progressId, loading)}
      leftIcon={leftIcon}
      selected={enabled}
      onClick={() => {
        if (loading) {
          return;
        }

        setLoading(!loading);
      }}
      yellow={enabled}
    >
      Turn on lights
    </ActionChip>
  );
};

export default ActionChipLights;
