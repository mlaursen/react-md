import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { CardFooter } from "@react-md/core/card/CardFooter";
import { CardHeader } from "@react-md/core/card/CardHeader";
import { CardSubtitle } from "@react-md/core/card/CardSubtitle";
import { CardTitle } from "@react-md/core/card/CardTitle";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function AdditionalCardComponentsExample(): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Main Title</CardTitle>
        <CardSubtitle>Subtitle</CardSubtitle>
      </CardHeader>
      <CardContent>
        <Typography margin="none">Here is some text to display.</Typography>
      </CardContent>
      <CardFooter>
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </CardFooter>
    </Card>
  );
}
