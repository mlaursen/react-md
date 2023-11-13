import { CircularProgress, Overlay } from "@react-md/core";
import { Suspense, type ReactElement, type ReactNode } from "react";

export interface CircularProgressOverlaySuspenseProps {
  visible: boolean;
  children: ReactNode;
}

export function CircularProgressOverlaySuspense(
  props: CircularProgressOverlaySuspenseProps
): ReactElement {
  const { visible, children } = props;
  return (
    <Suspense
      fallback={
        <Overlay visible={visible} disableTransition>
          <CircularProgress aria-label="LOading" />
        </Overlay>
      }
    >
      {children}
    </Suspense>
  );
}
