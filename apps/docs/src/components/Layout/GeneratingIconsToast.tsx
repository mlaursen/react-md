import {
  Box,
  CircularProgress,
  LinearProgress,
  ToastContent,
  useRemoveToast,
} from "@react-md/core";
import CheckCircleIcon from "@react-md/material-icons/CheckCircleIcon";
import prettyMilliseconds from "pretty-ms";
import type { ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";
import type { GeneratingStats } from "src/api/material/types";
import styles from "./GeneratingIconsToast.module.scss";

const FIVE_SECONDS = 5000;
const TEN_SECONDS = 10000;

interface State {
  stats?: GeneratingStats | undefined;
  loading: boolean;
}

async function getStats(): Promise<GeneratingStats> {
  const response = await fetch("/api/material/check-status");
  const json = await response.json();

  return json;
}

export default function GeneratingIconsToast(): ReactElement {
  const [state, setState] = useState<State>({ loading: false });
  const { loading, stats } = state;
  const removeToast = useRemoveToast();

  useEffect(() => {
    if (loading) {
      return;
    }

    const load = async (): Promise<void> => {
      setState((prevState) => ({ ...prevState, loading: true }));
      const stats = await getStats();
      setState({ loading: false, stats });
    };

    if (!stats) {
      load();
      return;
    }

    const { remaining } = stats;
    let timeout: number;
    if (remaining === 0) {
      timeout = window.setTimeout(() => {
        removeToast();
      }, FIVE_SECONDS);
    } else {
      timeout = window.setTimeout(() => {
        load();
      }, TEN_SECONDS);
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loading, removeToast, stats]);

  let complete = false;
  let progress: ReactNode;
  let suffix: ReactNode;
  let message = "Generating the material icon components...";
  if (stats) {
    const { total, remaining, completed, startTime, endTime } = stats;
    suffix = (
      <Box disablePadding justify="space-between">
        <span>{`${remaining} remaining`}</span>
        <span>{`${completed} / ${total}`}</span>
      </Box>
    );
    progress = total > 0 && (
      <LinearProgress
        className={styles.progress}
        value={completed}
        max={total}
      />
    );
    complete = remaining === 0;
    if (complete && startTime && endTime) {
      message = `Completed in ${prettyMilliseconds(endTime - startTime)}!`;
    }
  }

  return (
    <>
      {complete ? (
        <CheckCircleIcon color="success" />
      ) : (
        <CircularProgress small disableCentered />
      )}
      <ToastContent>
        {message}
        {suffix}
      </ToastContent>
      {progress}
    </>
  );
}
