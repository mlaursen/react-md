import { type ReactNode } from "react";
import { Tooltipped } from "react-md";

export function Example({ tooltip }: { tooltip?: ReactNode }) {
  return (
    <Tooltipped id="test-id" tooltip={tooltip}>
      {({ tooltip, ...props }) => (
        <>
          <button type="button" {...props}>
            button
          </button>
          {tooltip}
        </>
      )}
    </Tooltipped>
  );
}
