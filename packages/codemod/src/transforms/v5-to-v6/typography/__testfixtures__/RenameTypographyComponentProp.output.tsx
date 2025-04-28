import { type ReactElement } from "react";
import { Typography } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Typography as="div">Hello, world!</Typography>
      <Typography as={CustomElement}>Hello, world!</Typography>
    </>
  );
}
