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
  return (
    <>
      <CardTitle small={small}>{children}</CardTitle>
      <CardTitle small={small && anotherProp}>{children}</CardTitle>
    </>
  );
}
