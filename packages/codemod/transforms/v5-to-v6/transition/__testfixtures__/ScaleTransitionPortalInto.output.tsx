// TODO: The `portalInto` for the `ScaleTransition` cannot be converted automatically.
import { type ReactElement } from "react";
import { Portal, ScaleTransition } from "react-md";
import SomeComponent from "./SomeComponent";

export default function Example(): ReactElement {
  return (
    <Portal>(<ScaleTransition>
        <SomeComponent />
      </ScaleTransition>)</Portal>
  );
}
