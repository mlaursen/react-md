import { type ReactElement } from "react";
import { VerticalDividerProps, VerticalDivider } from "react-md";

export interface ExampleProps extends VerticalDividerProps {
  children: ReactElement;
}

export default function Example(props: ExampleProps): ReactElement {
  return <VerticalDivider {...props} />;
}
