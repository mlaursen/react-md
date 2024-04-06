import { Card, CardContent, Typography } from "react-md";
import { type ReactElement } from "react";

export default function FullWidthCardExample(): ReactElement {
  return (
    <Card fullWidth>
      <CardContent>
        <Typography margin="none">Here is some text to display.</Typography>
      </CardContent>
    </Card>
  );
}
