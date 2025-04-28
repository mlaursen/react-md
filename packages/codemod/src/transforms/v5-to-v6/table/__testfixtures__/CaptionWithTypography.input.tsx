import { type ReactElement } from "react";
import { Caption, Table, Typography } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Typography>Hello, world!</Typography>
      <Table>
        <Caption>Caption!</Caption>
      </Table>
    </>
  );
}
