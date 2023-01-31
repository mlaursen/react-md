import { useState } from "react";
import type { UseStateInitializer, UseStateSetter } from "../types";
import { useEnsuredId } from "../useEnsuredId";
import type { ExpansionPanelProps } from "./ExpansionPanel";

/** @remarks \@since 6.0.0 */
export interface ExpansionPanelHookOptions {
  /**
   * An optional id to prefix each panel with.
   *
   * @defaultValue `"expansion-panel-" + useId()`
   */
  baseId?: string;

  /**
   * Set this to `true` if multiple panels can be open at the same time.
   *
   * @defaultValue `false`
   */
  multiple?: boolean;

  /**
   * Set this to `true` to enforce that at least one panel must always be
   * expanded.
   *
   * @defaultValue `false`
   */
  preventAllClosed?: boolean;

  /**
   * This is a convenience option to disable the expansion transition for all
   * panels.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;

  /**
   * @defaultValue `preventAllClosed ? ["expansion-panel-" + useId() + "-1"] : []`
   */
  defaultExpandedIds?: UseStateInitializer<string[]>;

  /**
   * This can only be used if the {@link defaultExpandedIds} was not provided
   * and using index based panels.
   *
   * @example
   * ```tsx
   * const { getPanelProps } = useExpansionPanels({
   *   defaultExpandedIndex: 2,
   * });
   *
   * return (
   *   <ExpansionPanel {...getPanelProps(0)} />
   *   <ExpansionPanel {...getPanelProps(1)} />
   *   // expanded on first render
   *   <ExpansionPanel {...getPanelProps(2)} />
   *   <ExpansionPanel {...getPanelProps(3)} />
   * );
   * ```
   */
  defaultExpandedIndex?: number;

  /**
   * @defaultValue `false`
   */
  disableContentPadding?: boolean;
}

/** @remarks \@since 6.0.0 */
export type ProvidedExpansionPanelProps = Pick<
  Required<ExpansionPanelProps>,
  | "id"
  | "disabled"
  | "expanded"
  | "onExpandClick"
  | "disableTransition"
  | "disableContentPadding"
>;

/**
 * @param indexOrPanelId - This should either be a DOM id to use for the panel
 * or the panel's index.
 * @returns Props to pass to an `ExpansionPanel` for it to work correctly.
 * @remarks \@since 6.0.0
 */
export type GetExpansionPanelProps = (
  indexOrPanelId: string | number
) => ProvidedExpansionPanelProps;

/** @remarks \@since 6.0.0 */
export interface ExpansionPanelImplementation {
  /**
   * The current set of expanded panel ids if you need this for some reason.
   */
  expandedIds: ReadonlySet<string>;

  /**
   * This can be used to manually control which panels are expanded if the
   * default behavior does not work for your use case.
   */
  setExpandedIds: UseStateSetter<ReadonlySet<string>>;

  /**
   * @example
   * Index Based Panels
   * ```tsx
   * <ExpansionPanel {...getPanelProps(0)} />
   * <ExpansionPanel {...getPanelProps(1)} />
   * <ExpansionPanel {...getPanelProps(2)} />
   * ```
   *
   * @example
   * Custom Panel Ids
   * ```tsx
   * <ExpansionPanel {...getPanelProps("address-panel")} />
   * <ExpansionPanel {...getPanelProps("billing-panel")} />
   * <ExpansionPanel {...getPanelProps("confirmation-panel")} />
   * ```
   */
  getPanelProps: GetExpansionPanelProps;
}

/**
 * Use this hook to control the expanded state for a group of `ExpansionPanel`.
 *
 * @example
 * Index Based Panels
 * ```tsx
 * import {
 *   ExpansionList,
 *   ExpansionPanel,
 *   useExpansionPanels,
 * } from "@react-md/core";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { getPanelProps } = useExpansionPanels();
 *
 *   return (
 *     <ExpansionList>
 *       <ExpansionPanel {...getPanelProps(0)} headerChildren="Panel 1">
 *         Panel 1 Contents
 *       </ExpansionPanel>
 *       <ExpansionPanel {...getPanelProps(1)} headerChildren="Panel 2">
 *         Panel 2 Contents
 *       </ExpansionPanel>
 *       <ExpansionPanel {...getPanelProps(2)} headerChildren="Panel 3">
 *         Panel 3 Contents
 *       </ExpansionPanel>
 *     </ExpansionList>
 *   );
 * }
 * ```
 *
 * @example
 * Custom Panel Ids and Expand All Panels by Default
 * ```tsx
 * import {
 *   ExpansionList,
 *   ExpansionPanel,
 *   useExpansionPanels,
 * } from "@react-md/core";
 * import { type ReactElement } from "react";
 *
 * import { BillingAddress } from "./BillingAddress";
 * import { BillingInformation } from "./BillingInformation";
 * import { PersonalInformation } from "./PersonalInformation";
 *
 * const panel1Id = "personal-information-panel";
 * const panel2Id = "billing-information-panel";
 * const panel3Id = "billing-address-panel";
 *
 * function Example(): ReactElement {
 *   const { getPanelProps } = useExpansionPanels({
 *     multiple: true,
 *     defaultExpandedIds: () => [panel1Id, panel2Id, panel3Id],
 *   });
 *
 *   return (
 *     <ExpansionList>
 *       <ExpansionPanel {...getPanelProps(panel1Id)} headerChildren="Personal Information">
 *         <PersonalInformation />
 *       </ExpansionPanel>
 *       <ExpansionPanel {...getPanelProps(panel2Id)} headerChildren="Billing Information">
 *         <BillingInformation />
 *       </ExpansionPanel>
 *       <ExpansionPanel {...getPanelProps(panel3Id)} headerChildren="Billing Address">
 *         <BillingAddress />
 *       </ExpansionPanel>
 *     </ExpansionList>
 *   );
 * }
 * ```
 *
 *
 * @remarks
 * \@since 6.0.0 The hook was renamed from `usePanels` to `useExpansionPanels`,
 * the API changed to return `getPanelProps` instead of a generated list of
 * panel props based on the provided `count`, and the hook no longer supports
 * having all panels expanded by default.
 */
export function useExpansionPanels(
  options: ExpansionPanelHookOptions = {}
): ExpansionPanelImplementation {
  const {
    baseId: propBaseId,
    multiple = false,
    preventAllClosed = false,
    disableTransition = false,
    defaultExpandedIds,
    defaultExpandedIndex,
    disableContentPadding = false,
  } = options;

  const baseId = useEnsuredId(propBaseId, "expansion-panel");
  const createId = (index: number): string => `${baseId}-${index + 1}`;
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(() => {
    if (typeof defaultExpandedIds === "undefined") {
      const initialList: string[] = [];
      if (typeof defaultExpandedIndex === "number" || preventAllClosed) {
        initialList.push(createId(defaultExpandedIndex ?? 0));
      }

      return new Set(initialList);
    }

    const ids =
      typeof defaultExpandedIds === "function"
        ? defaultExpandedIds()
        : defaultExpandedIds;
    return new Set(ids);
  });

  return {
    expandedIds,
    setExpandedIds,
    getPanelProps(indexOrPanelId) {
      const id =
        typeof indexOrPanelId === "string"
          ? indexOrPanelId
          : createId(indexOrPanelId);

      const expanded = expandedIds.has(id);
      const disabled = expanded && preventAllClosed && expandedIds.size === 1;
      return {
        id,
        disabled,
        expanded,
        onExpandClick() {
          if (disabled) {
            return;
          }

          setExpandedIds((prevIds) => {
            const expanded = prevIds.has(id);
            if (expanded && preventAllClosed && prevIds.size === 1) {
              return prevIds;
            }

            if (!multiple) {
              return new Set(expanded ? [] : [id]);
            }

            const nextIds = new Set(prevIds);
            if (expanded) {
              nextIds.delete(id);
            } else {
              nextIds.add(id);
            }

            return nextIds;
          });
        },
        disableTransition,
        disableContentPadding,
      };
    },
  };
}
