import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "@react-md/button";
import { Form, useCheckboxState } from "@react-md/form";
import { Overlay } from "@react-md/overlay";
import { useFixedPositioning } from "@react-md/transition";
import { Text } from "@react-md/typography";
import {
  HorizontalPosition,
  useToggle,
  VerticalPosition,
  PositionAnchor,
} from "@react-md/utils";

import Checkbox from "components/Checkbox";
import Radio from "components/Radio";

import "./FixedPositioningExample.scss";

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

const anchors = horizontals.reduce<Record<string, PositionAnchor>>(
  (value, x) => {
    verticals.forEach(y => {
      value[`${x} ${y}`] = { x, y };
    });

    return value;
  },
  {}
);

const FixedPositioningExample: FC = () => {
  const [visible, show, hide, toggle] = useToggle(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [disableSwapping, handleSwapCange] = useCheckboxState(false);
  const [transformOrigin, handleOriginChange] = useCheckboxState(false);
  const [hideOnScroll, handleScrollChange] = useCheckboxState(true);
  const [hideOnResize, handleScrollResize] = useCheckboxState(true);
  const [anchor, setAnchor] = useState<PositionAnchor>({
    x: "center",
    y: "below",
  });

  useEffect(() => {
    if (!visible) {
      return;
    }

    // changing the anchor while it is visible will not update the position, so need to
    // re-show it again to get the updated position. This really only happens if changing
    // the radio buttons with the up and down arrow keys and "submitting" the form to make
    // it visible.
    hide();
    const frame = window.requestAnimationFrame(show);
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [anchor]);

  const {
    style,
    onEnter,
    onEntering,
    onEntered,
    onExited,
  } = useFixedPositioning({
    fixedTo: buttonRef.current,
    anchor,
    transformOrigin,
    disableSwapping,
    onScroll: hideOnScroll ? hide : undefined,
    onResize: hideOnResize ? hide : undefined,
  });

  return (
    <Fragment>
      <Form className="fixed-position-form">
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
        <fieldset>
          <Text component="legend">Anchor</Text>
          {Object.entries(anchors).map(([value, currentAnchor]) => (
            <Radio
              key={value}
              id={`fixed-anchor-${value}`}
              name="anchor"
              value={value}
              label={value}
              checked={
                anchor.x === currentAnchor.x && anchor.y === currentAnchor.y
              }
              onChange={() => {
                setAnchor(currentAnchor);
              }}
            />
          ))}
        </fieldset>
        <div className="fixed-position-footer">
          <Button
            id="fixed-positioning-button"
            ref={buttonRef}
            onClick={toggle}
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
        classNames={{
          appear: "fixed-position--enter",
          appearActive: "fixed-position--enter-active",
          enter: "fixed-position--enter",
          enterActive: "fixed-position--enter-active",
          exit: "fixed-position--exit",
          exitActive: "fixed-position--exit-active",
        }}
        timeout={{ enter: 200, exit: 150 }}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExited={onExited}
      >
        <div style={style} className="fixed-position-div">
          <Text>This is some amazing text in a fixed element!</Text>
        </div>
      </CSSTransition>
    </Fragment>
  );
};

export default FixedPositioningExample;
