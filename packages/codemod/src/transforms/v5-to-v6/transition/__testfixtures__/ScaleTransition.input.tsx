import { type ReactElement } from "react";
import { ScaleTransition } from "react-md";

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
      <ScaleTransition transitionIn={transitionIn} portal>
        <SomeComponent />
      </ScaleTransition>
      <ScaleTransition transitionIn={transitionIn} portal={false}>
        <SomeComponent />
      </ScaleTransition>
      <ScaleTransition transitionIn={transitionIn} portal={portal}>
        <SomeComponent />
      </ScaleTransition>
    </>
  );
}
