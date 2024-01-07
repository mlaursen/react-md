"use client";
import {
  Button,
  Card,
  CardContent,
  Typography,
  useCollapseTransition,
  useToggle,
} from "@react-md/core";
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
