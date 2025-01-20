"use client";

import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { cssUtils } from "@react-md/core/cssUtils";
import { LinearProgress } from "@react-md/core/progress/LinearProgress";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useToggle } from "@react-md/core/useToggle";
import { loop } from "@react-md/core/utils/loop";
import CelebrationOutlinedIcon from "@react-md/material-icons/CelebrationOutlinedIcon";
import { type ReactElement, useEffect, useState } from "react";

import styles from "./ProgressbarTooltipExample.module.scss";

export default function ProgressbarTooltipExample(): ReactElement {
  const { value, toggle, toggled } = useIncrementingValue();

  return (
    <>
      <Button onClick={toggle} theme="primary" themeType="contained">
        {toggled ? "Stop" : "Start"}
      </Button>
      <div style={{ "--offset": `${value}%` }} className={styles.container}>
        <LinearProgress aria-label="Example" value={value} />
        <Tooltip
          visible
          className={box({
            disableWrap: true,
            disablePadding: true,
            className: cssUtils({
              backgroundColor:
                value < 30 ? "warning" : value === 100 ? "success" : undefined,
              className: styles.tooltip,
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
  toggle: () => void;
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

declare module "react" {
  interface CSSProperties {
    "--offset"?: string;
  }
}
