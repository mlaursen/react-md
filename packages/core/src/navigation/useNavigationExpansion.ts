"use client";
import { useEffect, useMemo, useRef } from "react";
import { type UseStateInitializer, type UseStateSetter } from "../types.js";
import { useReadonlySet } from "../useReadonlySet.js";
import {
  type NavigationLinkComponent,
  type NavigationRenderData,
} from "./types.js";
import { getPartsFromPathname } from "./utils.js";

/**
 * @since 6.0.0
 */
export interface NavigationExpansionOptions {
  pathname: string;
  linkComponent: NavigationLinkComponent;

  /**
   * An optional list or set of items that should be expanded before the user
   * interacts with the navigation items.
   *
   * The default implementation works well with the `DefaultNavigationRenderer`
   * by allowing all "folders" (or groups) of items to be expanded by the
   * `pathname`.
   *
   * ```ts
   * const navItems: readonly NavigationItem[] = [
   *   {
   *     type: "route",
   *     href: "/",
   *     children: "Home",
   *   },
   *   {
   *     type: "group",
   *     href: "/group-1",
   *     children: "Group 1",
   *     items: [
   *       {
   *         type: "group",
   *         href: "/subgroup-1",
   *         children: "Subgroup 1",
   *         items: [
   *           {
   *             type: "route",
   *             href: "/route",
   *             children: "Group 1 > Subgroup 1 > Route"
   *           },
   *         ],
   *       },
   *       {
   *         type: "route",
   *         href: "/route",
   *         children: "Group 1 > Route",
   *       },
   *     ],
   *   },
   * ];
   * ```
   *
   * - `pathname === "/"` - No groups expanded
   *   - Resolves as `new Set(["/"])`
   * - `pathname === "/group-1/subgroup-1/route"` - "Group 1" and "Subgroup 1"
   *   are expanded
   *   - Resolves as `new Set(["/", "/group-1", "/group-1/route"])`
   */
  defaultExpandedItems?: UseStateInitializer<
    ReadonlySet<string> | readonly string[]
  >;

  /**
   * The default behavior is to update the `expandedItems` set as the `pathname`
   * updates to capture anytime the user might navigate to outer routes outside
   * of the `Navigation` component. i.e. Click a link within the page.
   *
   * Set this to `true` to disable this behavior.
   *
   * @defaultValue `false`
   */
  disableFollowingPathname?: boolean;
}

/**
 * @since 6.0.0
 */
export interface NavigationExpansionImplementation {
  data: NavigationRenderData;
  expandedItems: ReadonlySet<string>;
  setExpandedItems: UseStateSetter<ReadonlySet<string>>;
  toggleExpandedItem(href: string): void;
}

/**
 * Used to create the `data` prop for the `Navigation` component and handling
 * the expansion of items.
 *
 * @example Main Usage
 * ```tsx
 * "use client";
 * import { Navigation } from "@react-md/core/navigation/Navigation";
 * import { useNavigationExpansion } from "@react-md/core/navigation/useNavigationExpansion";
 * import Link from "next/link";
 * import { usePathname } from "next/navigation.js";
 * import { type ReactElement } from "react";
 *
 * import { navItems } from "./navItems.js";
 *
 * export function Example(): ReactElement {
 *   const pathname = usePathname();
 *   const { data } = useNavigationExpansion({
 *     pathname,
 *     linkComponent: Link,
 *   });
 *
 *   return <Navigation data={data} items={navItems} />;
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useNavigationExpansion(
  options: NavigationExpansionOptions
): NavigationExpansionImplementation {
  const {
    pathname,
    linkComponent,
    defaultExpandedItems,
    disableFollowingPathname,
  } = options;
  const {
    value: expandedItems,
    setValue: setExpandedItems,
    toggleValue: toggleExpandedItem,
  } = useReadonlySet({
    defaultValue: defaultExpandedItems,
  });

  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (disableFollowingPathname || pathname === prevPathname.current) {
      return;
    }

    prevPathname.current = pathname;
    setExpandedItems((prev) => {
      const next = new Set([...prev, ...getPartsFromPathname(pathname)]);
      if (next.size === prev.size) {
        return prev;
      }

      return next;
    });
  }, [disableFollowingPathname, pathname, setExpandedItems]);

  const data = useMemo<NavigationRenderData>(
    () => ({
      pathname,
      linkComponent,
      expandedItems,
      toggleExpandedItem,
    }),
    [expandedItems, linkComponent, pathname, toggleExpandedItem]
  );

  return {
    data,
    expandedItems,
    setExpandedItems,
    toggleExpandedItem,
  };
}
