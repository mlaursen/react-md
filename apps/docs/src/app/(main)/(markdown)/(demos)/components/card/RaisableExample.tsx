import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { Typography } from "@react-md/core/typography/Typography";
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
