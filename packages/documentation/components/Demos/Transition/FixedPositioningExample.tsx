import React, {
  FC,
  Fragment,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Button } from "@react-md/button";
import { CSSTransition } from "react-transition-group";
import { Overlay } from "@react-md/overlay";
import { Text } from "@react-md/typography";
import { useFixedPositioning } from "@react-md/transition";
import { useInputToggle, Form } from "@react-md/form";
import {
  useToggle,
  HorizontalPosition,
  VerticalPosition,
} from "@react-md/utils";

import Checkbox from "components/Checkbox";
import Radio from "components/Radio";

import "./fixed-positioning-example.scss";

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

const FixedPositioningExample: FC = () => {
  const { toggled: visible, toggle, disable: hide, enable: show } = useToggle();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [disableSwapping, handleSwapCange] = useInputToggle(false);
  const [transformOrigin, handleOriginChange] = useInputToggle(false);
  const [hideOnScroll, handleScrollChange] = useInputToggle(true);
  const [hideOnResize, handleScrollResize] = useInputToggle(true);
  const [x, setX] = useState<HorizontalPosition>("center");
  const [y, setY] = useState<VerticalPosition>("below");

  const handleXChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setX(event.currentTarget.value as HorizontalPosition);
    },
    []
  );
  const handleYChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setY(event.currentTarget.value as VerticalPosition);
    },
    []
  );

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
  }, [x, y]);

  const {
    style,
    onEnter,
    onEntering,
    onEntered,
    onExited,
  } = useFixedPositioning({
    fixedTo: buttonRef.current,
    anchor: { x, y },
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
          fullWidth
        />
        <Checkbox
          id="fixed-origin"
          name="options"
          label="Transform Origin"
          checked={transformOrigin}
          onChange={handleOriginChange}
          fullWidth
        />
        <Checkbox
          id="fixed-hide-on-scroll"
          name="options"
          label="Hide on scroll"
          checked={hideOnScroll}
          onChange={handleScrollChange}
          fullWidth
        />
        <Checkbox
          id="fixed-hide-on-resize"
          name="options"
          label="Hide on resize"
          checked={hideOnResize}
          onChange={handleScrollResize}
          fullWidth
        />
        <fieldset>
          <legend>Horizontal Anchor</legend>
          {horizontals.map(x => (
            <Radio
              id={`fixed-x-${x}`}
              defaultChecked={x === "center"}
              name="anchorX"
              label={x}
              value={x}
              fullWidth
              onChange={handleXChange}
            />
          ))}
        </fieldset>
        <fieldset>
          <legend>Vertical Anchor</legend>
          {verticals.map(y => (
            <Radio
              id={`fixed-x-${y}`}
              defaultChecked={y === "below"}
              name="anchorY"
              label={y}
              value={y}
              fullWidth
              onChange={handleYChange}
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
