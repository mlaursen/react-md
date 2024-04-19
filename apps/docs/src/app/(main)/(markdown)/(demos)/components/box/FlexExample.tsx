import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { type ReactElement } from "react";

export default function FlexExample(): ReactElement {
  return (
    <Box>
      {Array.from({ length: 20 }, (_, i) => (
        <Card key={i}>
          <CardContent>{`Item ${i + 1}`}</CardContent>
        </Card>
      ))}
    </Box>
  );
}
