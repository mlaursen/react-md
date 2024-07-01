import { type ReactNode } from "react";
import { SimplePosition, Tooltipped } from "react-md";

interface Test1Props {
  onClick?(event: MouseEvent): void;
  position?: SimplePosition;
  defaultPosition?: SimplePosition;
}

export function Example(props: Test1Props) {
  return (
    <Tooltipped {...props} id="test-id" tooltip="Tooltip">
      <button type="button">Button</button>
    </Tooltipped>
  );
}
