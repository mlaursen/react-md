import { type ReactElement } from "react";
import { Table, Typography } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Typography>Hello, world!</Typography>
      <Table>
        <Typography type="caption">Caption!</Typography>
      </Table>
    </>
  );
}
