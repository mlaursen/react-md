import { type ReactElement } from "react";
import { ScaleTransition } from "react-md";
import SomeComponent from "./SomeComponent";

export default function Example(): ReactElement {
  return (
    <>
      <ScaleTransition portalIntoId="some-id" transitionIn={transitionIn}>
        <SomeComponent />
      </ScaleTransition>
    </>
  );
}
