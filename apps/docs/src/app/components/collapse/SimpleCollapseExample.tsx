"use client";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Typography,
  useToggle,
} from "@react-md/core";
import { type ReactElement } from "react";

export default function SimpleCollapseExample(): ReactElement {
  const { toggled, toggle } = useToggle(true);

  return (
    <>
      <Button onClick={toggle}>Toggle</Button>
      <Collapse collapsed={toggled}>
        <Card fullWidth>
          <CardContent>
            <Typography>Here is some content to display!</Typography>
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
}
