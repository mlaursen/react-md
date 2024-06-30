import { type ReactElement } from "react";
import { Portal } from "react-md";

export default function Example(): ReactElement {
  return (<>
    <Portal disabled>Content</Portal>
    <Portal disabled>Hello, world!</Portal>
    <Portal disabled>
      <div>Hello, world!</div>
    </Portal>
  </>);
}
