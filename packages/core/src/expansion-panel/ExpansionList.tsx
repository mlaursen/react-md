"use client";

import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { useExpansionList } from "./useExpansionList.js";

/**
 * @since 6.0.0 No longer requires the `onKeyDown` prop.
 */
export interface ExpansionListProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

  children: ReactNode;
}

/**
 * **Client Component**
 *
 * This component is only used to implement the keyboard movement behavior for
 * the `ExpansionPanel` components.
 *
 * @see {@link https://react-md.dev/components/expansion-panel | ExpansionPanel Demos}
 * @see {@link useExpansionList} for a custom implementation example if you do
 * not want to use a `<div>` for this wrapper component.
 * @since 6.0.0 Uses the new keyboard movement API and does not
 * require the `onKeyDown` prop to be provided.
 */
export function ExpansionList(props: ExpansionListProps): ReactElement {
  const { ref, onClick, onFocus, onKeyDown, children, ...remaining } = props;

  const { movementContext, movementProps } = useExpansionList({
    ref,
    onClick,
    onFocus,
    onKeyDown,
  });

  return (
    <KeyboardMovementProvider value={movementContext}>
      <div {...remaining} {...movementProps}>
        {children}
      </div>
    </KeyboardMovementProvider>
  );
}
