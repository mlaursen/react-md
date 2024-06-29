import { type ReactElement, type ReactNode } from "react";
import { CardTitle } from "react-md";

interface ExampleProps {
  small?: boolean;
  anotherProp?: boolean;
  children: ReactNode;
}

export default function Example({
  small,
  children,
  anotherProp,
}: ExampleProps): ReactElement {
  return (<>
    <CardTitle type={small ? "subtitle-1" : undefined}>{children}</CardTitle>
    <CardTitle type={small && anotherProp ? "subtitle-1" : undefined}>{children}</CardTitle>
  </>);
}
