import { type ReactElement, type ReactNode } from "react";
import { CardTitle } from "react-md";

export interface ExampleProps {
  children: ReactNode;
}

export default function Example(props: ExampleProps): ReactElement {
  const { children } = props;
  return (
    <>
      <CardTitle>{children}</CardTitle>
      <CardTitle small>{children}</CardTitle>
      <CardTitle small={false}>{children}</CardTitle>
      <CardTitle noWrap>{children}</CardTitle>
      <CardTitle noWrap={false}>{children}</CardTitle>
      <CardTitle small noWrap>
        {children}
      </CardTitle>
    </>
  );
}
