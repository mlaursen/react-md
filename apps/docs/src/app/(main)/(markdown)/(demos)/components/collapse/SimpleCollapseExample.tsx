"use client";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { Collapse } from "@react-md/core/transition/Collapse";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
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
