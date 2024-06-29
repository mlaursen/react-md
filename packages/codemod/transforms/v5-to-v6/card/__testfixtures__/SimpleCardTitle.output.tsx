import { type ReactElement, type ReactNode } from "react";
import { CardTitle } from "react-md";

export interface ExampleProps {
  children: ReactNode;
}

export default function Example(props: ExampleProps): ReactElement {
  const { children } = props;
  return (<>
    <CardTitle>{children}</CardTitle>
    <CardTitle type="subtitle-1">{children}</CardTitle>
    <CardTitle>{children}</CardTitle>
    <CardTitle textOverflow="nowrap">{children}</CardTitle>
    <CardTitle>{children}</CardTitle>
    <CardTitle type="subtitle-1" textOverflow="nowrap">
      {children}
    </CardTitle>
  </>);
}
