import { type ReactElement } from "react";
import { ConditionalPortal } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <ConditionalPortal portal={false}>Content</ConditionalPortal>
      <ConditionalPortal>Hello, world!</ConditionalPortal>
      <ConditionalPortal>
        <div>Hello, world!</div>
      </ConditionalPortal>
    </>
  );
}
