import { type ReactElement } from "react";
import { TableCheckbox } from "react-md";

export function Example(): ReactElement {
  return (
    <>
      <TableCheckbox cellId="some-unique-id" />
    </>
  );
}
