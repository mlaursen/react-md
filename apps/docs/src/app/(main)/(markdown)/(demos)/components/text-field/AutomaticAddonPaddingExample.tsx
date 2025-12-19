"use client";

import { Avatar } from "@react-md/core/avatar/Avatar";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { Chip } from "@react-md/core/chip/Chip";
import { cssUtils } from "@react-md/core/cssUtils";
import { Form } from "@react-md/core/form/Form";
import { TextField, type TextFieldProps } from "@react-md/core/form/TextField";
import { useTextFieldContainerAddons } from "@react-md/core/form/useTextFieldContainerAddons";
import { CircularProgress } from "@react-md/core/progress/CircularProgress";
import { useToggle } from "@react-md/core/useToggle";
import { loop } from "@react-md/core/utils/loop";
import { randomInt } from "@react-md/core/utils/randomInt";
import CancelIcon from "@react-md/material-icons/CancelIcon";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement, useEffect, useState } from "react";

export default function AutomaticAddonPaddingExample(): ReactElement {
  const { leftAddon, rightAddon, toggle, running } = useRotatingAddons();
  const { style, leftAddonRef, rightAddonRef } = useTextFieldContainerAddons({
    leftAddon: !!leftAddon,
    rightAddon: !!rightAddon,

    // this will be merged with the returned `style`
    // style: {
    //   color: "red",
    // },

    // if there should be more of a gap between the addon and the input, use
    // these two options to add values to the `calc()` expression. This **must**
    // start with a `+ ` or `- `
    //
    // leftAddonExtraCalc: "+ var(--rmd-icon-spacing) - 0.125rem",
    // rightAddonExtraCalc: "+ calc(var(--rmd-icon-spacing) * 2)",

    // if refs are required for the addon container, they will be merged with
    // the returned leftAddonRef/rightAddonRef
    // leftAddonRef: customLeftAddonRef,
    // rightAddonRef: customRightAddonRef,
  });

  return (
    <Form
      style={{ maxWidth: "30rem" }}
      className={box({ align: "start", stacked: true, fullWidth: true })}
    >
      <TextField
        label="Label"
        placeholder="Placeholder"
        style={style}
        leftAddon={leftAddon}
        leftAddonProps={{ ref: leftAddonRef, pointerEvents: true }}
        rightAddon={rightAddon}
        rightAddonProps={{ ref: rightAddonRef, pointerEvents: true }}
        defaultValue="Here's some default content to show padding and overflow"
        inputClassName={cssUtils({ textOverflow: "ellipsis" })}
      />
      <Button onClick={toggle} themeType="outline" theme="primary">
        {running && <CircularProgress aria-label="Running" />}
        <span>{running ? "Stop" : "Start"}</span>
      </Button>
    </Form>
  );
}

const ADDONS = [
  <CircularProgress
    aria-label="Loading"
    dense
    disableCentered
    key="progress"
  />,
  <Chip key="chip">Chip</Chip>,
  <Button
    aria-label="Favorite"
    buttonType="icon"
    iconSize="small"
    key="favorite-button"
  >
    <FavoriteIcon />
  </Button>,
  <Avatar color="orange" key="orange-avatar">
    O
  </Avatar>,
  <Avatar color="red" key="red-avatar">
    R
  </Avatar>,
  <Chip key="cancelable-chip" rightAddon={<CancelIcon />} selected>
    Chip
  </Chip>,
];
const max = ADDONS.length - 1;

interface RotatingAddonsProps extends Pick<
  TextFieldProps,
  "leftAddon" | "rightAddon"
> {
  toggle: () => void;
  running: boolean;
}

function useRotatingAddons(): RotatingAddonsProps {
  const [leftAddonIndex, setLeftAddonIndex] = useState<number | undefined>();
  const [rightAddonIndex, setRightAddonIndex] = useState<number | undefined>();
  const { toggle, toggled: running } = useToggle();

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = globalThis.setInterval(() => {
      setLeftAddonIndex((prev) => {
        const next = randomInt({ min: 0, max });
        if (next === prev) {
          return loop({ value: prev, increment: true, max });
        }

        return next;
      });
      setRightAddonIndex((prev) => {
        const next = randomInt({ min: 0, max });
        if (next === prev) {
          return loop({ value: prev, increment: true, max });
        }

        return next;
      });
    }, 1500);

    return () => {
      globalThis.clearInterval(interval);
    };
  }, [leftAddonIndex, rightAddonIndex, running]);

  return {
    toggle() {
      if (leftAddonIndex === undefined && rightAddonIndex === undefined) {
        setLeftAddonIndex(randomInt({ min: 0, max }));
        setRightAddonIndex(randomInt({ min: 0, max }));
      }

      toggle();
    },
    running,
    leftAddon: typeof leftAddonIndex === "number" && ADDONS[leftAddonIndex],
    rightAddon: typeof rightAddonIndex === "number" && ADDONS[rightAddonIndex],
  };
}
