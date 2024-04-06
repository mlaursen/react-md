import { Typography } from "react-md";
import { type ReactElement } from "react";

export default function DefaultListStylesExample(): ReactElement {
  return (
    <Typography as="ol">
      <li>Read this list</li>
      <li>Do something else</li>
      <ul>
        <li>Maybe read a book?</li>
        <li>Or go on a hike?</li>
        <li>Cook dinner?</li>
      </ul>
      <li>Celebrate</li>
    </Typography>
  );
}
