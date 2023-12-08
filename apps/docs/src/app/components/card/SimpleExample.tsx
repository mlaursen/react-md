import { Card, CardContent, Typography } from "@react-md/core";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  return (
    <Card>
      <CardContent>
        <Typography margin="none">Here is some text to display.</Typography>
      </CardContent>
    </Card>
  );
}
