"use client";
import { type ReactElement } from "react";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { Collapse } from "@react-md/core/transition/Collapse";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";

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
