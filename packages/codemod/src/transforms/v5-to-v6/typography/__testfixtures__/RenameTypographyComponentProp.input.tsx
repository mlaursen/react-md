import { type ReactElement } from "react";
import { Typography } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Typography component="div">Hello, world!</Typography>
      <Typography component={CustomElement}>Hello, world!</Typography>
    </>
  );
}
