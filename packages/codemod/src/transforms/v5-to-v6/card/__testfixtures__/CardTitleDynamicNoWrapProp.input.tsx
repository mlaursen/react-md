import { type ReactElement } from "react";
import { CardTitle } from "react-md";

interface ExampleProps {
  noWrap?: boolean;
}

export default function Example({ noWrap }: ExampleProps): ReactElement {
  return <CardTitle noWrap={noWrap}>{children}</CardTitle>;
}
