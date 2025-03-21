import { type ReactElement } from "react";
import { Portal, ScaleTransition } from "react-md";

import SomeComponent from "./SomeComponent";

export default function Example({
  portal,
  transitionIn,
}: {
  portal?: boolean;
  transitionIn: boolean;
}): ReactElement {
  return (
    <>
      <ScaleTransition transitionIn={transitionIn}>
        <SomeComponent />
      </ScaleTransition>
      <Portal><ScaleTransition transitionIn={transitionIn}>
          <SomeComponent />
        </ScaleTransition></Portal>
      <ScaleTransition transitionIn={transitionIn}>
        <SomeComponent />
      </ScaleTransition>
      <Portal disabled={!portal}><ScaleTransition transitionIn={transitionIn}>
          <SomeComponent />
        </ScaleTransition></Portal>
    </>
  );
}
