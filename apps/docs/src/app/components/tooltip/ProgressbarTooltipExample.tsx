"use client";
import {
  Button,
  LinearProgress,
  Tooltip,
  box,
  cssUtils,
  loop,
  useToggle,
} from "@react-md/core";
import CelebrationOutlinedIcon from "@react-md/material-icons/CelebrationOutlinedIcon";
import { useEffect, useState, type ReactElement } from "react";

export default function ProgressbarTooltipExample(): ReactElement {
  const { value, toggle, toggled } = useIncrementingValue();

  return (
    <>
      <Button onClick={toggle} theme="primary" themeType="contained">
        {toggled ? "Stop" : "Start"}
      </Button>
      <div style={{ position: "relative", width: "100%" }}>
        <LinearProgress aria-label="Example" value={value} />
        <Tooltip
          visible
          style={{
            position: "absolute",
            left: `${value}%`,
            top: "calc(100% + 1em)",
            transform: "translateX(-50%)",
            transition:
              "left .15s cubic-bezier(0.4, 0, 0.6, 1), background-color .3s",
            willChange: "left",
          }}
          className={box({
            disableWrap: true,
            disablePadding: true,
            className: cssUtils({
              backgroundColor:
                value < 30 ? "warning" : value === 100 ? "success" : undefined,
            }),
          })}
          disablePortal
          textOverflow="nowrap"
        >
          {value}%
          {value === 100 && <CelebrationOutlinedIcon theme="on-success" />}
        </Tooltip>
      </div>
    </>
  );
}

function useIncrementingValue(): {
  value: number;
  toggle(): void;
  toggled: boolean;
} {
  const { toggled, toggle } = useToggle();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!toggled) {
      return;
    }

    const timeout = window.setTimeout(
      () => {
        setValue(
          loop({
            value,
            min: 0,
            max: 100,
            increment: true,
          })
        );
      },
      value === 100 ? 5000 : 300
    );
    return () => {
      window.clearTimeout(timeout);
    };
  }, [toggled, value]);

  return { value, toggle, toggled };
}
