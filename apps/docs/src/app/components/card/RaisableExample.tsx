import { Card, CardContent, Typography } from "@react-md/core";
import { type ReactElement } from "react";

export default function RaisableExample(): ReactElement {
  return (
    <Card raisable>
      <CardContent>
        <Typography margin="none">Here is some text to display.</Typography>
      </CardContent>
    </Card>
  );
}
