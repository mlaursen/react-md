"use client";

import type {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

import type { KeyboardMovementProviderImplementation } from "../movement/types.js";
import { useKeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";

/**
 * @internal
 * @since 6.0.0
 */
const getPanelsOnly = (container: HTMLElement): readonly HTMLElement[] => [
  ...container.querySelectorAll<HTMLElement>(".rmd-expansion-panel__button"),
];

/** @since 6.0.0 */
export interface ExpansionListHookOptions<E extends HTMLElement> {
  onClick?: MouseEventHandler<E>;
  onFocus?: FocusEventHandler<E>;
  onKeyDown?: KeyboardEventHandler<E>;
}

/** @since 6.0.0 */
export type ExpansionListImplementation<E extends HTMLElement> =
  KeyboardMovementProviderImplementation<E>;

/**
 * @example Custom Implementation
 * ```tsx
 * import { ExpansionPanel } from "@react-md/core/expansion-panel/ExpansionPanel";
 * import { useExpansionList } from "@react-md/core/expansion-panel/useExpansionList";
 * import { useExpansionPanels } from "@react-md/core/expansion-panel/useExpansionPanels";
 * import { KeyboardMovementProvider } from "@react-md/core/movement/useKeyboardMovementProvider";
 * import { Form } from "@react-md/core/form/Form";
 * import { type ReactElement } from "react";
 *
 * import { BillingAddress } from "./BillingAddress";
 * import { BillingInformation } from "./BillingInformation";
 * import { PersonalInformation } from "./PersonalInformation";
 *
 * function Example(): ReactElement {
 *   const { movementContext, movementProps } = useExpansionList();
 *   const { getPanelProps } = useExpansionPanels();
 *
 *   return (
 *     <KeyboardMovementProvider value={movementContext}>
 *       <Form {...movementProps}>
 *         <ExpansionPanel {...getPanelProps("personal-information-panel")}>
 *           <PersonalInformation />
 *         </ExpansionPanel>
 *         <ExpansionPanel {...getPanelProps("billing-information-panel")}>
 *           <BillingInformation />
 *         </ExpansionPanel>
 *         <ExpansionPanel {...getPanelProps("billing-address-panel")}>
 *           <BillingAddress />
 *         </ExpansionPanel>
 *       </Form>
 *     </KeyboardMovementProvider>
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/expansion-panel | ExpansionPanel Demos}
 * @since 6.0.0
 */
export function useExpansionList<E extends HTMLElement>(
  options: ExpansionListHookOptions<E> = {}
): ExpansionListImplementation<E> {
  return useKeyboardMovementProvider({
    ...options,
    loopable: true,
    includeDisabled: true,
    getFocusableElements: getPanelsOnly,
  });
}
