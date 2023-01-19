import { Button, useCollapseTransition, useToggle } from "@react-md/core";
import type { ReactElement } from "react";
import { ExamplePage1 } from "../ExamplePage1";

export function CollapseHookExample(): ReactElement {
  const { toggled, toggle } = useToggle(false);
  const { elementProps, rendered } = useCollapseTransition({
    transitionIn: toggled,
    // Collapse COnfiguration:
    // minHeight,
    // minPaddingBottom,
    // minPaddingTop,

    // as well as everything related to the useCSSTransition hook
    // style,
    // className,
    // timeout,
    // appear,
    // enter,
    // exit,
    // onEnter,
    // onEntering,
    // onEntered,
    // onExit,
    // onExiting,
    // onExited,
    // temporary,
    // exitedHidden,
  });

  return (
    <>
      <Button onClick={toggle}>Toggle</Button>
      {rendered && <ExamplePage1 {...elementProps} />}
    </>
  );
}
