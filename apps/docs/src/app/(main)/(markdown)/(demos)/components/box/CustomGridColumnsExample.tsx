import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { type ReactElement } from "react";

export default function CustomGridColumnsExample(): ReactElement {
  return (
    <Box grid gridColumns={4}>
      {Array.from({ length: 16 }, (_, i) => (
        <Card key={i}>
          <CardContent>{`Item ${i + 1}`}</CardContent>
        </Card>
      ))}
    </Box>
  );
}
