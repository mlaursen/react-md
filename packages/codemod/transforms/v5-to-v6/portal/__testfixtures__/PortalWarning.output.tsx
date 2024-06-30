// TODO: Check how the Portal prop `intoId` was used since it is no longer supported.
// TODO: Check how the Portal prop `into` was used since it is no longer supported.
import { type ReactElement } from "react";
import { Portal } from "react-md";

export default function Example(): ReactElement {
  return (<>
    <Portal>Content</Portal>
    <Portal>Content</Portal>
    <Portal>Content</Portal>
    <Portal>Content</Portal>
  </>);
}
