"use client";

import type { UseStateInitializer, UseStateSetter } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useReadonlySet } from "../useReadonlySet.js";
import type { ExpansionPanelProps } from "./ExpansionPanel.js";

/** @since 6.0.0 */
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
  preventAllCollapsed?: boolean;

  /**
   * This is a convenience option to disable the expansion transition for all
   * panels.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;

  /**
   * @defaultValue `preventAllCollapsed ? ["expansion-panel-" + useId() + "-1"] : []`
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

/** @since 6.0.0 */
export type ProvidedExpansionPanelProps = Pick<
  Required<ExpansionPanelProps>,
  | "disabled"
  | "expanded"
  | "onExpandClick"
  | "disableTransition"
  | "disableContentPadding"
> & { id?: string };

/**
 * @param indexOrPanelId - This should either be a DOM id to use for the panel
 * or the panel's index.
 * @returns Props to pass to an `ExpansionPanel` for it to work correctly.
 * @since 6.0.0
 */
export type GetExpansionPanelProps = (
  indexOrPanelId: string | number
) => ProvidedExpansionPanelProps;

/** @since 6.0.0 */
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
   * @example Index Based Panels
   * ```tsx
   * <ExpansionPanel {...getPanelProps(0)} />
   * <ExpansionPanel {...getPanelProps(1)} />
   * <ExpansionPanel {...getPanelProps(2)} />
   * ```
   *
   * @example Custom Panel Ids
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
 * @example Index Based Panels
 * ```tsx
 * import { ExpansionList } from "@react-md/core/expansion-panel/ExpansionList";
 * import { ExpansionPanel } from "@react-md/core/expansion-panel/ExpansionPanel";
 * import { useExpansionPanels } from "@react-md/core/expansion-panel/useExpansionPanels";
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
 * @example Custom Panel Ids and Expand All Panels by Default
 * ```tsx
 * import { ExpansionList } from "@react-md/core/expansion-panel/ExpansionList";
 * import { ExpansionPanel } from "@react-md/core/expansion-panel/ExpansionPanel";
 * import { useExpansionPanels } from "@react-md/core/expansion-panel/useExpansionPanels";
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
 * @see {@link https://next.react-md.dev/components/expansion-panel|ExpansionPanel Demos}
 * @since 6.0.0 The hook was renamed from `usePanels` to `useExpansionPanels`,
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
    preventAllCollapsed = false,
    disableTransition = false,
    defaultExpandedIds,
    defaultExpandedIndex,
    disableContentPadding = false,
  } = options;

  const baseId = useEnsuredId(propBaseId, "expansion-panel");
  const createId = (index: number): string => `${baseId}-${index + 1}`;
  const {
    value: expandedIds,
    setValue: setExpandedIds,
    toggleValue,
  } = useReadonlySet({
    toggleType: multiple ? "multiple" : "single",
    defaultValue: () => {
      if (typeof defaultExpandedIds === "undefined") {
        const initialList: string[] = [];
        if (typeof defaultExpandedIndex === "number" || preventAllCollapsed) {
          initialList.push(createId(defaultExpandedIndex ?? 0));
        }

        return new Set(initialList);
      }

      return typeof defaultExpandedIds === "function"
        ? defaultExpandedIds()
        : defaultExpandedIds;
    },
  });

  return {
    expandedIds,
    setExpandedIds,
    getPanelProps(indexOrPanelId) {
      let id: string | undefined;
      let panelId: string;
      if (typeof indexOrPanelId === "number") {
        id = createId(indexOrPanelId);
        panelId = id;
      } else {
        panelId = indexOrPanelId;
      }

      const expanded = expandedIds.has(panelId);
      const disabled =
        expanded && preventAllCollapsed && expandedIds.size === 1;
      return {
        id,
        disabled,
        expanded,
        onExpandClick() {
          if (disabled) {
            return;
          }

          toggleValue(panelId);
        },
        disableTransition,
        disableContentPadding,
      };
    },
  };
}
