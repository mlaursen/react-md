import { KeyboardMovementProvider } from "@react-md/core";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { useExpansionList } from "./useExpansionList";

/**
 * @remarks \@since 6.0.0 No longer requires the `onKeyDown` prop.
 */
export interface ExpansionListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * This component is only used to implement the keyboard movement behavior for
 * the `ExpansionPanel` components.
 *
 * @see {@link useExpansionList} for a custom implementation example if you do
 * not want to use a `<div>` for this wrapper component.
 * @remarks \@since 6.0.0 Uses the new keyboard movement API and does not
 * require the `onKeyDOwn` prop to be provided.
 */
export const ExpansionList = forwardRef<HTMLDivElement, ExpansionListProps>(
  function ExpansionList(props, ref) {
    const { onClick, onFocus, onKeyDown, children, ...remaining } = props;

    const { movementContext, movementProps } = useExpansionList({
      onClick,
      onFocus,
      onKeyDown,
    });

    return (
      <KeyboardMovementProvider value={movementContext}>
        <div {...remaining} {...movementProps} ref={ref}>
          {children}
        </div>
      </KeyboardMovementProvider>
    );
  }
);
