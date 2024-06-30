import { type ReactElement } from "react";
import { ConditionalPortal } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <ConditionalPortal portal>Hello, world!</ConditionalPortal>
      <ConditionalPortal portal={true}>Hello, world!</ConditionalPortal>
    </>
  );
}
