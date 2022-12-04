import type { KeyboardMovementProviderImplementation } from "@react-md/core";
import { useKeyboardMovementProvider } from "@react-md/core";
import type { FocusEventHandler, KeyboardEventHandler } from "react";

/**
 * @internal
 * @remarks \@since 6.0.0
 */
const getPanelsOnly = (container: HTMLElement): readonly HTMLElement[] => [
  ...container.querySelectorAll<HTMLElement>(".rmd-expansion-panel__button"),
];

/** @remarks \@since 6.0.0 */
export interface ExpansionListHookOptions<E extends HTMLElement> {
  onFocus?: FocusEventHandler<E>;
  onKeyDown?: KeyboardEventHandler<E>;
}

/** @remarks \@since 6.0.0 */
export type ExpansionListImplementation<E extends HTMLElement> =
  KeyboardMovementProviderImplementation<E>;

/**
 * @example
 * Custom Implementation
 * ```tsx
 * import { KeyboardMovementProvider } from "@react-md/core";
 * import {
 *   ExpansionPanel,
 *   useExpansionList,
 *   useExpansionPanels,
 * } from "@react-md/expansion-panel";
 * import { Form } from "@react-md/form";
 * import type { ReactElement } from "react";
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
 *       </FOrm>
 *     </KeyboardMovementProvider>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
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
