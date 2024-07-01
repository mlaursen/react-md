// TODO: The `Tooltipped` component has been removed. Update the code to use the `useTooltip` hook instead.
import { type ReactNode } from "react";
import { useTooltip } from "react-md";

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
