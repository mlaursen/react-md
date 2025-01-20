"use client";

import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { useCollapseTransition } from "@react-md/core/transition/useCollapseTransition";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function SimpleUseCollapseTransitionExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  const { elementProps } = useCollapseTransition({
    transitionIn: toggled,
  });

  return (
    <>
      <Button onClick={toggle}>Toggle</Button>
      <Card fullWidth {...elementProps}>
        <CardContent>
          <Typography>Here is some content to display!</Typography>
        </CardContent>
      </Card>
    </>
  );
}
