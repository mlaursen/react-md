import { type ReactElement } from "react";
import { Divider, DividerProps } from "react-md";

export interface ExampleProps extends DividerProps {
  children: ReactElement;
}

export default function Example(props: ExampleProps): ReactElement {
  return <Divider {...props} vertical />;
}
