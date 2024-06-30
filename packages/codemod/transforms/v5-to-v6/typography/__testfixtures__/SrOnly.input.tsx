import { type ReactElement } from "react";
import { SrOnly } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <SrOnly component="div">Hello, world!</SrOnly>
      <SrOnly component={CustomElement}>Hello, world!</SrOnly>
    </>
  );
}
