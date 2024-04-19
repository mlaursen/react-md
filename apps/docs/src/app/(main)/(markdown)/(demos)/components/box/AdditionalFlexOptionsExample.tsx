import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { Divider } from "@react-md/core/divider/Divider";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function AdditionalFlexOptions(): ReactElement {
  return (
    <>
      <Typography>No Default Padding</Typography>
      <Box disablePadding>
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i}>
            <CardContent>{`Item ${i + 1}`}</CardContent>
          </Card>
        ))}
      </Box>
      <Typography>Stacked, Align Stretch, Full Width</Typography>
      <Box stacked align="stretch" fullWidth>
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i}>
            <CardContent>{`Item ${i + 1}`}</CardContent>
          </Card>
        ))}
      </Box>
      <Divider />
      <Typography>Align Start</Typography>
      <Box align="start">
        <Card>
          <CardContent>First</CardContent>
        </Card>
        <Card>
          <CardContent>Second</CardContent>
          <CardContent>Some additional content.</CardContent>
        </Card>
      </Box>
      <Divider />
      <Typography>Reversed, Justify Space Between</Typography>
      <Box align="start" reversed justify="space-between">
        <Card>
          <CardContent>First</CardContent>
        </Card>
        <Card>
          <CardContent>Second</CardContent>
          <CardContent>Some additional content.</CardContent>
        </Card>
      </Box>
    </>
  );
}
