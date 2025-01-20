"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Switch } from "@react-md/core/form/Switch";
import { CircularProgress } from "@react-md/core/progress/CircularProgress";
import { LinearProgress } from "@react-md/core/progress/LinearProgress";
import { type ReactElement, useEffect, useState } from "react";

export default function DisableDeterminateTransition(): ReactElement {
  const { progress, toggle, restart, running } = useProgress();

  return (
    <Box stacked align="start" fullWidth>
      <CircularProgress
        aria-label="Example"
        value={progress}
        disableTransition
      />
      <LinearProgress aria-label="Example" value={progress} disableTransition />

      <Switch label="Run" checked={running} onChange={toggle} />
      <Button onClick={restart}>Restart</Button>
    </Box>
  );
}

const UPDATE_INTERVAL = 10;

interface ProgressControls {
  toggle: () => void;
  restart: () => void;
  running: boolean;
  progress: number;
}

function useProgress(): ProgressControls {
  const [state, setState] = useState({
    running: false,
    progress: 0,
  });
  const { running, progress } = state;

  useEffect(() => {
    if (!running) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const nextProgress = Math.min(100, progress + 0.1);
      setState({
        running: progress !== nextProgress && progress !== 100,
        progress: nextProgress,
      });
    }, UPDATE_INTERVAL);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [progress, running]);

  return {
    toggle: () => {
      setState((prev) => ({ ...prev, running: !prev.running }));
    },
    restart: () => {
      setState({ running: false, progress: 0 });
    },
    running,
    progress,
  };
}
