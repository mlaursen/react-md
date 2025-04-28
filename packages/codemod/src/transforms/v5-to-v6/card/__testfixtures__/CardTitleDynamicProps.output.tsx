import { type ReactElement } from "react";
import { CardTitle } from "react-md";

interface ExampleProps {
  small?: boolean;
  noWrap?: boolean;
}

export default function Example({ small, noWrap }: ExampleProps): ReactElement {
  return (
    <CardTitle type={small ? "subtitle-1" : undefined} textOverflow={noWrap ? "nowrap" : undefined}>
      {children}
    </CardTitle>
  );
}
