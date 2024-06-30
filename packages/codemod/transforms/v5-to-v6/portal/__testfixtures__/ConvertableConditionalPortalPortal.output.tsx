import { type ReactElement } from "react";
import { Portal } from "react-md";

export default function Example(): ReactElement {
  return (<>
    <Portal>Hello, world!</Portal>
    <Portal>Hello, world!</Portal>
  </>);
}
