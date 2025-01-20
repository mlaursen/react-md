"use client";

import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { CrossFade } from "@react-md/core/transition/CrossFade";
import { type ReactElement, useState } from "react";

export default function NewItemsExample(): ReactElement {
  const [items, setItems] = useState(0);

  return (
    <>
      <Box fullWidth disablePadding>
        <Button
          theme="primary"
          themeType="contained"
          disabled={items >= 16}
          onClick={() => {
            setItems((prev) => prev + 1);
          }}
        >
          Add Item
        </Button>
        <Button
          onClick={() => {
            setItems(0);
          }}
          theme="warning"
          themeType="contained"
        >
          Reset
        </Button>
      </Box>
      <Box grid fullWidth gridColumns="fill">
        {Array.from({ length: items }, (_, i) => (
          <CrossFade key={i}>
            <Card>
              <CardContent>{`Item ${i + 1}`}</CardContent>
            </Card>
          </CrossFade>
        ))}
      </Box>
    </>
  );
}
