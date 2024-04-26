"use client";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Card, type CardProps } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { Switch } from "@react-md/core/form/Switch";
import { CrossFade } from "@react-md/core/transition/CrossFade";
import { forwardRef, useState, type ReactElement } from "react";

export default function IncorrectExample(): ReactElement {
  const [items, setItems] = useState(0);
  const [fixed, setFixed] = useState(false);

  const CustomCard = fixed ? CustomCardFixed : CustomCardBad;

  return (
    <>
      <Box fullWidth disablePadding>
        <Button
          theme="primary"
          themeType="contained"
          disabled={items >= 16}
          onClick={() => setItems((prev) => prev + 1)}
        >
          Add Item
        </Button>
        <Button
          onClick={() => setItems(0)}
          theme="warning"
          themeType="contained"
        >
          Reset
        </Button>
        <Switch
          label="Fixed?"
          checked={fixed}
          onChange={(event) => setFixed(event.currentTarget.checked)}
        />
      </Box>
      <Box grid fullWidth gridColumns="fill">
        {Array.from({ length: items }, (_, i) => (
          <CrossFade key={i}>
            <CustomCard index={i} />
          </CrossFade>
        ))}
      </Box>
    </>
  );
}

function CustomCardBad(props: { index: number }): ReactElement {
  const { index } = props;

  return (
    <Card>
      <CardContent>{`Item ${index + 1}`}</CardContent>
    </Card>
  );
}

interface CustomCardFixedProps extends CardProps {
  index: number;
}

const CustomCardFixed = forwardRef<HTMLDivElement, CustomCardFixedProps>(
  function CustomCardFixed(props, ref) {
    const { index, ...remaining } = props;
    return (
      <Card {...remaining} ref={ref}>
        <CardContent>{`Item ${index + 1}`}</CardContent>
      </Card>
    );
  }
);
