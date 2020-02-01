import { useRef, useEffect } from "react";
import { SelectedIds } from "@react-md/tree";

import { isTemporaryLayout } from "./useLayout";
import useNavigationVisibility from "./useNavigationVisibility";

/**
 * This hook allows the temporary navigation pane to automatically close
 * whenever the route changes (so basically a user clicked one of the nav
 * items). This is normally the desired behavior for a temporary navigation
 * pane, but it can be disabled and a custom implementation can be used with the
 * `useNavigationVisibility` hook.
 *
 * Note: This hook assumes that the `selectedIds` array will only ever have a
 * single `selectedId` and the `selectedId` changes when the route changes since
 * that is how the `useLayoutNavigation` hook works.
 *
 * @param selectedIds The current selected ids within the navigation tree.
 * @param disabled Boolean if this hook should be disabled.
 * @private
 */
export default function useTemporaryNavigation(
  selectedIds: SelectedIds,
  disabled: boolean = false
): void {
  const { hideNav, isNavVisible, layout } = useNavigationVisibility();
  const temporary = isTemporaryLayout(layout);

  const [selectedId] = selectedIds;
  const lastSelectedId = useRef(selectedId);

  useEffect(() => {
    if (
      disabled ||
      !temporary ||
      !isNavVisible ||
      lastSelectedId.current === selectedId
    ) {
      // need to update the lastSelectedId since the selectedId might've changed
      // by a route change OUTSIDE of the navigation drawer. if it isn't
      // updated, it'll automatically close the next time it is opened.
      lastSelectedId.current = selectedId;
      return;
    }

    lastSelectedId.current = selectedId;
    hideNav();
  }, [disabled, hideNav, isNavVisible, selectedId, temporary]);
}
