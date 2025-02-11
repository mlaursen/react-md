"use client";

import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { useFixedPositioning } from "@react-md/core/positioning/useFixedPositioning";
import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
import {
  SCALE_CLASSNAMES,
  SCALE_TIMEOUT,
} from "@react-md/core/transition/useScaleTransition";
import { type ReactElement, useRef, useState } from "react";

export default function SimpleExample(): ReactElement {
  const fixedTo = useRef<HTMLButtonElement>(null);
  const [transitionIn, setTransitionIn] = useState(false);
  const { style, transitionOptions } = useFixedPositioning({
    fixedTo,
  });
  const { elementProps, rendered } = useCSSTransition({
    ...transitionOptions,
    transitionIn,
    temporary: true,
    // any transition could be used
    timeout: SCALE_TIMEOUT,
    classNames: SCALE_CLASSNAMES,
  });

  return (
    <>
      <Button ref={fixedTo} onClick={() => setTransitionIn(!transitionIn)}>
        Toggle
      </Button>
      {rendered && (
        <Card {...elementProps} style={style}>
          <CardContent>Fixed Temporary Element</CardContent>
        </Card>
      )}
    </>
  );
}
