import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Typography,
} from "react-md";
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
