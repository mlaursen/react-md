"use client";
import { Chip, CircularProgress, randomInt } from "react-md";
import BrightnessHighIcon from "@react-md/material-icons/BrightnessHighIcon";
import BrightnessLowIcon from "@react-md/material-icons/BrightnessLowIcon";
import { useEffect, useState, type ReactElement } from "react";

export default function ChipWithCircularProgressExample(): ReactElement {
  const { enabled, loading, onClick } = useDemoState();

  let addon = enabled ? <BrightnessHighIcon /> : <BrightnessLowIcon />;
  if (loading) {
    addon = <CircularProgress aria-label="Loading" disableCentered />;
  }
  return (
    <>
      <Chip leftAddon={addon} onClick={onClick}>
        Toggle
      </Chip>
      <Chip rightAddon={addon} onClick={onClick}>
        Toggle
      </Chip>
    </>
  );
}

interface DemoStateHookResult {
  enabled: boolean;
  loading: boolean;
  onClick(): void;
}

function useDemoState(): DemoStateHookResult {
  const [{ enabled, loading }, setState] = useState({
    loading: false,
    enabled: false,
  });

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timeout = window.setTimeout(
      () => {
        setState((prevState) => ({
          loading: false,
          enabled: !prevState.enabled,
        }));
      },
      randomInt({ min: 3, max: 5 }) * 1000
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loading]);
  const onClick = (): void => {
    if (loading) {
      return;
    }

    setState((prevState) => ({ ...prevState, loading: true }));
  };

  return {
    enabled,
    loading,
    onClick,
  };
}
