import { type ReactElement } from "react";
import { SrOnly } from "react-md";

export default function Example(): ReactElement {
  return (<>
    <SrOnly as="div">Hello, world!</SrOnly>
    <SrOnly as={CustomElement}>Hello, world!</SrOnly>
  </>);
}
