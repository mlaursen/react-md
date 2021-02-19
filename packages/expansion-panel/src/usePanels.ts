import {
  createRef,
  Dispatch,
  KeyboardEventHandler,
  RefObject,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { loop } from "@react-md/utils";

export interface UsePanelsOptions {
  /**
   * The prefix to use for all of the panel ids. This is used to generate the id
   * for each panel as well as determine if a panel is expanded.
   */
  idPrefix: string;

  /**
   * The number of panels that will be used by this expansion logic and
   * generates the number of panel props to be used in the return value. This
   * should be a number greater than 0 and will throw a `RangeError` if it is
   * not in development.
   */
  count: number;

  /**
   * Boolean if multiple panels can be expanded at a time. The default behavior
   * is to only allow one panel to be expanded and will close the previous panel
   * when a new one is expanded.
   */
  multiple?: boolean;

  /**
   * Boolean if the expansion logic should prevent all the panels from being
   * closed.
   */
  preventAllClosed?: boolean;

  /**
   * Either the index that should be expanded by default, a list of indexes that
   * should be expanded by default, or `-1` which will expand all panels by
   * default.
   *
   * When this is omitted and `undefined`, no panels will be expanded by
   * default.
   */
  defaultExpandedIndex?: number | number[];
}

/**
 * An object of props that gets generated for each panel within the hook.
 */
export interface ProvidedPanelProps {
  /**
   * The DOM id for the panel which is really just `${idPrefix}-${index + 1}`.
   */
  id: string;

  /**
   * A ref object for the panel. This is required so that the parent keyboard
   * event handler can focus the next/previous/first/last panel when the correct
   * arrow key or home/end key is pressed. If there is only one panel and the
   * keydown event handler isn't being used, this prop is not required to be
   * passed to the expansion panel.
   */
  headerRef: RefObject<HTMLButtonElement>;

  /**
   * This will be `true` when the panel is expanded or the previous panel was
   * expanded and the panel is not the first panel in the list.
   */
  marginTop: boolean;

  /**
   * Boolean if the panel's expansion state should be disabled. This will only
   * be true when the `preventAllClosed` option has been enabled and the panel
   * is the last remaining expanded panel.
   */
  disabled: boolean;

  /**
   * Boolean if the panel is corrently expanded.
   */
  expanded: boolean;

  /**
   * A function that will toggle the expansion of this panel in the list.
   */
  onExpandClick(): void;
}

type ExpandedIds = string[];
type CreateExpandById = (panelId: string) => () => void;
type ExpansionDispatcher = Dispatch<SetStateAction<ExpandedIds>>;
type ExpansionPanelKeyDownHandler = KeyboardEventHandler<HTMLDivElement>;

type ReturnValue = [
  ProvidedPanelProps[],
  ExpansionPanelKeyDownHandler,
  ExpandedIds,
  ExpansionDispatcher,
  CreateExpandById
];

type PanelMemo = Pick<ProvidedPanelProps, "id" | "headerRef">;

/**
 * @internal
 */
const attemptFocus = (index: number, panels: PanelMemo[]): void => {
  const panel = panels[index]?.headerRef.current;
  if (panel) {
    panel.focus();
  }
};

/**
 * This hook is used to control the expansion of a list of panels along with
 * providing some of the required props for each panel. This hook will provide
 * an ordered list of:
 *
 * - the list of panel props that include the `id`, `key`, `expanded`, and
 *   `onExpandChange`.
 * - a keydown event handler to pass to a parent component (normally the
 *   ExpansionList) to allow keyboard movement with the arrow keys, and home+end
 *   keys. This should only be used when there are multiple panels.
 * - the current list of panel ids that are expanded
 * - the React setState dispatcher for controlling the expanded list of ids
 *   manually if desired
 * - a function to create a handler for toggling the expansion of a specific
 *   panel
 *
 * This hook is usually used to control a list of expansion panels, but can also
 * control a single panel if desired.
 *
 * Examples:
 *
 * Single panel:
 *
 * ```tsx
 * const [panels] = usePanels({ count: 1, idPrefix: "my-panel" });
 * // since the count is one, it'll just be a list of only one panel props
 * const [panelProps] = panels;
 *
 * return (
 *   <ExpansionPanel {...panelProps}>
 *     Content within the panel...
 *   </ExpansionPanel>
 * );
 * ```
 *
 * Multiple Panels:
 *
 * ```tsx
 * const [panels, onKeyDown] = usePanels({ count: 3, idPrefix: "panel-list" });
 *
 * const [panel1Props, panel2Props, panel3Props] = panels;
 *
 * return (
 *   <ExpansionList onKeyDown={onKeyDown}>
 *     <ExpansionPanel {...panel1Props}>
 *       Panel 1 Content...
 *     </ExpansionPanel>
 *     <ExpansionPanel {...panel2Props}>
 *       Panel 2 Content...
 *     </ExpansionPanel>
 *     <ExpansionPanel {...panel3Props}>
 *       Panel 3 Content...
 *     </ExpansionPanel>
 *   </ExpansionList>
 * );
 * ```
 */
export function usePanels({
  idPrefix,
  count,
  multiple = false,
  preventAllClosed = false,
  defaultExpandedIndex,
}: UsePanelsOptions): ReturnValue {
  if (process.env.NODE_ENV !== "production") {
    if (count < 1) {
      throw new RangeError("The `count` must be greater than `0`");
    }

    if (
      typeof defaultExpandedIndex === "number" &&
      defaultExpandedIndex >= count
    ) {
      throw new RangeError(
        "The `defaultExpandedIndex` must be less than or equal to the `count`"
      );
    }

    if (typeof defaultExpandedIndex === "number" && defaultExpandedIndex < -1) {
      throw new RangeError(
        "The `defaultExpandedIndex` must be greater than or equal to `-1`"
      );
    }

    if (Array.isArray(defaultExpandedIndex)) {
      const greater = defaultExpandedIndex.filter((i) => i > count);
      if (greater.length) {
        throw new RangeError(
          "The `defaultExpandedIndex` array must contain numbers less than the `count`"
        );
      }

      const lessThan = defaultExpandedIndex.filter((i) => i < 0);
      if (lessThan.length) {
        throw new RangeError(
          "The `defaultExpandedIndex` array must contain numbers greater than or equal to `0`"
        );
      }
    }
  }

  const panels = useMemo<PanelMemo[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: `${idPrefix}-${i + 1}`,
        headerRef: createRef<HTMLButtonElement>(),
      })),
    [idPrefix, count]
  );

  const [expandedIds, setExpandedIds] = useState<ExpandedIds>(() => {
    if (typeof defaultExpandedIndex === "undefined") {
      return preventAllClosed ? [panels[0].id] : [];
    }

    if (typeof defaultExpandedIndex === "number") {
      return defaultExpandedIndex === -1
        ? panels.map(({ id }) => id)
        : [panels[Math.min(defaultExpandedIndex, panels.length)].id];
    }

    return panels
      .filter((_, i) => defaultExpandedIndex.includes(i))
      .map(({ id }) => id);
  });

  const createExpandClick: CreateExpandById = (panelId) => () => {
    setExpandedIds((prevIds) => {
      const i = prevIds.indexOf(panelId);
      if (!multiple) {
        if (prevIds[0] === panelId && prevIds.length === 1) {
          return preventAllClosed ? prevIds : [];
        }

        return [panelId];
      }

      const nextSelectedIds = prevIds.slice();
      if (i === -1) {
        nextSelectedIds.push(panelId);
      } else {
        nextSelectedIds.splice(i, 1);
      }

      if (preventAllClosed && nextSelectedIds.length === 0) {
        return [panelId];
      }

      return nextSelectedIds;
    });
  };

  let previousExpanded = false;
  const panelPropList = panels.map(({ id, headerRef }, i) => {
    const expanded = expandedIds.includes(id);
    const marginTop = i > 0 && (expanded || previousExpanded);
    previousExpanded = expanded;

    return {
      id,
      disabled: expanded && preventAllClosed && expandedIds.length === 1,
      expanded,
      headerRef,
      marginTop,
      onExpandClick: createExpandClick(id),
    };
  });

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      const { key } = event;
      const increment = key === "ArrowDown";
      const decrement = key === "ArrowUp";
      const jumpToFirst = key === "Home";
      const jumpToLast = key === "End";
      if (!increment && !decrement && !jumpToFirst && !jumpToLast) {
        return;
      }

      const currentIndex = panels.findIndex(
        ({ headerRef }) => event.target === headerRef.current
      );
      if (currentIndex === -1) {
        return;
      }

      // don't want page scroll behavior
      event.preventDefault();
      if (jumpToFirst) {
        attemptFocus(0, panels);
        return;
      }

      if (jumpToLast) {
        attemptFocus(panels.length - 1, panels);
        return;
      }

      attemptFocus(
        loop({
          value: currentIndex,
          max: panels.length - 1,
          increment,
        }),
        panels
      );
    },
    [panels]
  );

  return [
    panelPropList,
    onKeyDown,
    expandedIds,
    setExpandedIds,
    createExpandClick,
  ];
}
