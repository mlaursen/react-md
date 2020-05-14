import React, { FC, useCallback, useRef, useState } from "react";
import CSSTransition, {
  CSSTransitionClassNames,
} from "react-transition-group/CSSTransition";
import { Button } from "@react-md/button";
import {
  Checkbox,
  Fieldset,
  Form,
  ListboxOption,
  Select,
  useChecked,
} from "@react-md/form";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { Overlay } from "@react-md/overlay";
import { useFixedPositioning } from "@react-md/transition";
import { Text } from "@react-md/typography";
import {
  HorizontalPosition,
  PositionAnchor,
  PositionWidth,
  useToggle,
  VerticalPosition,
} from "@react-md/utils";

import styles from "./FixedPositioningExample.module.scss";

const horizontals: HorizontalPosition[] = [
  "left",
  "right",
  "center",
  "inner-left",
  "inner-right",
];
const verticals: VerticalPosition[] = [
  "above",
  "below",
  "center",
  "top",
  "bottom",
];

const widths: PositionWidth[] = ["auto", "equal", "min"];

const anchors = horizontals.reduce<Record<string, PositionAnchor>>(
  (value, x) => {
    verticals.forEach((y) => {
      value[`${x} ${y}`] = { x, y };
    });

    return value;
  },
  {}
);

const anchorOptions = Object.entries(anchors).map(([value, anchor]) => ({
  ...anchor,
  label: value,
  value,
}));

type Anchor = typeof anchorOptions[0];
const CENTERED_ANCHOR = anchorOptions.find(
  (anchor) => anchor.label === "center center"
) as Anchor;

const CLASSNAMES: CSSTransitionClassNames = {
  appear: styles.enter,
  appearActive: styles.entering,
  enter: styles.enter,
  enterActive: styles.entering,
  exit: styles.exit,
  exitActive: styles.exiting,
};

const FixedPositioningExample: FC = () => {
  const [visible, show, hide] = useToggle(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [disableSwapping, handleSwapCange] = useChecked(false);
  const [transformOrigin, handleOriginChange] = useChecked(false);
  const [hideOnScroll, handleScrollChange] = useChecked(true);
  const [hideOnResize, handleScrollResize] = useChecked(true);
  const [anchor, setAnchor] = useState(anchorOptions[0]);
  const handleAnchorChange = useCallback(
    (_value: string, anchor: ListboxOption) => {
      setAnchor(anchor as Anchor);
    },
    []
  );
  const [width, setWidth] = useState<PositionWidth>("auto");
  const handleWidthChange = useCallback((nextWidth: string) => {
    setAnchor(CENTERED_ANCHOR);
    setWidth(nextWidth as PositionWidth);
  }, []);

  const {
    style,
    onEnter,
    onEntering,
    onEntered,
    onExited,
  } = useFixedPositioning({
    fixedTo: buttonRef.current,
    anchor: { x: anchor.x, y: anchor.y },
    width,
    transformOrigin,
    disableSwapping,
    onScroll(_event, { fixedTo: button }) {
      if (hideOnScroll) {
        hide();
        return;
      }

      if (!button) {
        return;
      }
      // hide when the button isn't in the viewport anymore if the
      // hideOnScroll behavior is disabled
      const { top } = button.getBoundingClientRect();
      if (top < 0 || top > window.innerHeight) {
        hide();
      }
    },
    onResize(_event) {
      if (hideOnResize) {
        hide();
      }
    },
  });

  return (
    <>
      <Form className={styles.form}>
        <Fieldset legend="Fixed Positioning Options">
          <Checkbox
            id="fixed-swap"
            name="options"
            label="Disable Swapping"
            checked={disableSwapping}
            onChange={handleSwapCange}
          />
          <Checkbox
            id="fixed-origin"
            name="options"
            label="Transform Origin"
            checked={transformOrigin}
            onChange={handleOriginChange}
          />
          <Checkbox
            id="fixed-hide-on-scroll"
            name="options"
            label="Hide on scroll"
            checked={hideOnScroll}
            onChange={handleScrollChange}
          />
          <Checkbox
            id="fixed-hide-on-resize"
            name="options"
            label="Hide on resize"
            checked={hideOnResize}
            onChange={handleScrollResize}
          />
        </Fieldset>
        <Select
          id="fixed-anchor-type"
          label="Anchor"
          className={styles.select}
          listboxClassName={styles.listbox}
          inline
          options={anchorOptions}
          value={anchor.value}
          onChange={handleAnchorChange}
          rightChildren={<ArrowDropDownSVGIcon />}
          listboxWidth="min"
          isOptionDisabled={(option) => {
            const opt = option as Anchor;
            return width !== "auto" && !opt.value.startsWith("center");
          }}
        />
        <Select
          id="fixed-anchor-width"
          label="Fixed element width"
          className={styles.select}
          inline
          options={widths}
          value={width}
          onChange={handleWidthChange}
          rightChildren={<ArrowDropDownSVGIcon />}
        />
        <div className={styles.footer}>
          <Button
            id="fixed-positioning-button"
            ref={buttonRef}
            onClick={show}
            theme="primary"
            themeType="contained"
            type="submit"
          >
            Toggle
          </Button>
        </div>
      </Form>
      <Overlay
        id="fixed-positioning-overlay"
        onRequestClose={hide}
        hidden
        visible={visible}
      />
      <CSSTransition
        in={visible}
        mountOnEnter
        unmountOnExit
        classNames={CLASSNAMES}
        timeout={{ enter: 200, exit: 150 }}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExited={onExited}
      >
        <div id="fixed-position-div" style={style} className={styles.div}>
          <Text>This is some amazing text in a fixed element!</Text>
        </div>
      </CSSTransition>
    </>
  );
};

export default FixedPositioningExample;
