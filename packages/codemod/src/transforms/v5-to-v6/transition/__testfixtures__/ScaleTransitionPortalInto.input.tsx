import { type ReactElement } from "react";
import { ScaleTransition } from "react-md";
import SomeComponent from "./SomeComponent";

export default function Example(): ReactElement {
  return (
    <ScaleTransition portalInto={() => document.getElementById("some-id")}>
      <SomeComponent />
    </ScaleTransition>
  );
}
