"use client";
import { type ReactElement } from "react";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Typography,
  useToggle,
} from "react-md";

export default function DisableTransitionExample(): ReactElement {
  const { toggled, toggle } = useToggle(true);

  return (
    <>
      <Button onClick={toggle}>Toggle</Button>
      <Collapse collapsed={toggled} timeout={0}>
        <Card fullWidth>
          <CardContent>
            <Typography>Here is some content to display!</Typography>
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
}
