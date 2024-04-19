import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

// Change this value to see the difference between fit and fill
const ITEMS = 3;

export default function AutoFillGridColumnsExample(): ReactElement {
  return (
    <>
      <Typography>auto-fit (default)</Typography>
      <Box grid gridColumns="fit">
        {Array.from({ length: ITEMS }, (_, i) => (
          <Card key={i}>
            <CardContent>{`Item ${i + 1}`}</CardContent>
          </Card>
        ))}
      </Box>
      <Typography>auto-fill</Typography>
      <Box grid gridColumns="fill">
        {Array.from({ length: ITEMS }, (_, i) => (
          <Card key={i}>
            <CardContent>{`Item ${i + 1}`}</CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}
