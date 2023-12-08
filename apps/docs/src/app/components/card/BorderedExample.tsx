import { Card, CardContent, Typography } from "@react-md/core";
import { type ReactElement } from "react";

export default function BorderedExample(): ReactElement {
  return (
    <Card bordered>
      <CardContent disableSecondaryColor>
        <Typography margin="none">Here is some text to display.</Typography>
      </CardContent>
    </Card>
  );
}
