import { Box, Chip, CircularProgress, randomInt } from "@react-md/core";
import BrightnessHighIcon from "@react-md/material-icons/BrightnessHighIcon";
import BrightnessLowIcon from "@react-md/material-icons/BrightnessLowIcon";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

export function IncludingCircularProgress(): ReactElement {
  const [{ enabled, loading }, setState] = useState({
    loading: false,
    enabled: false,
  });

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setState((prevState) => ({
        loading: false,
        enabled: !prevState.enabled,
      }));
    }, randomInt({ min: 3, max: 5 }) * 1000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loading]);

  let addon = enabled ? <BrightnessHighIcon /> : <BrightnessLowIcon />;
  if (loading) {
    addon = <CircularProgress disableCentered />;
  }
  const onClick = (): void => {
    if (loading) {
      return;
    }

    setState((prevState) => ({ ...prevState, loading: true }));
  };

  return (
    <>
      <Box>
        <Chip leftAddon={addon} onClick={onClick}>
          Toggle
        </Chip>
        <Chip rightAddon={addon} onClick={onClick}>
          Toggle
        </Chip>
      </Box>
      <Box>
        <Chip
          leftAddon={addon}
          selected={enabled}
          selectedIconAfter
          onClick={onClick}
        >
          Toggle
        </Chip>
        <Chip rightAddon={addon} selected={enabled} onClick={onClick}>
          Toggle
        </Chip>
      </Box>
      <Box>
        <Chip
          leftAddon={addon}
          selected={enabled}
          selectedThemed
          onClick={onClick}
        >
          Toggle
        </Chip>
        <Chip
          rightAddon={addon}
          selected={enabled}
          selectedThemed
          onClick={onClick}
        >
          Toggle
        </Chip>
      </Box>
    </>
  );
}
