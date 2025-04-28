import { type ReactElement } from "react";
import { Portal } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Portal into={something}>Content</Portal>
      <Portal intoId="some-id">Content</Portal>
      <Portal into={somethingElse}>Content</Portal>
      <Portal intoId="some-other-id">Content</Portal>
    </>
  );
}
