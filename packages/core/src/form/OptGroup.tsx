"use client";

import { type ReactNode, forwardRef } from "react";

import { type ListElement, type ListProps } from "../list/List.js";
import {
  ListSubheader,
  type ListSubheaderProps,
} from "../list/ListSubheader.js";
import { MenuItemGroup } from "../menu/MenuItemGroup.js";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";

/** @since 6.0.0 */
export interface OptGroupProps extends Omit<ListProps, "role"> {
  /**
   * This is really the `children` to display in a `ListSubheader` that
   * describes the optgroup. It was named `label` to match the native
   * `<optgroup>` element.
   *
   * @see {@link labelProps} for additional styling and options.
   */
  label: ReactNode;

  /**
   * This can be used to apply any additional props to the `ListSubheader` that
   * describes the group of options.
   */
  labelProps?: PropsWithRef<
    Omit<ListSubheaderProps, "role" | "children">,
    HTMLLIElement
  >;

  /**
   * This should be any `Option`s to display within the group.
   */
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * This component is more of a "convenience component" to help enforce the
 * correct accessibility when creating an `<optgroup>` with the `Select`
 * component.
 *
 * @example Simple Example
 * ```tsx
 * import { Select } from "@react-md/core/form/Select";
 * import { OptGroup } from "@react-md/core/form/OptGroup";
 * import { Option } from "@react-md/core/form/Option";
 * import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <Select label="Choose an animal">
 *       <OptGroup label="Land" labelProps={{ className: "custom-class-name" }}>
 *         <Option value={0}>Cat</Option>
 *         <Option value={1}>Dog</Option>
 *         <Option value={2}>Tiger</Option>
 *       </OptGroup>
 *       <OptGroup label="Water" labelProps={{ rightAddon: <FavoriteIcon /> }}>
 *         <Option value={3}>Dolphin</Option>
 *         <Option value={4}>Flounder</Option>
 *       </OptGroup>
 *     </Select>
 *
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export const OptGroup = forwardRef<ListElement, OptGroupProps>(
  function OptGroup(props, ref) {
    const { children, label, labelProps, ...remaining } = props;
    const labelId = useEnsuredId(labelProps?.id, "optgroup");

    return (
      <MenuItemGroup aria-labelledby={labelId} {...remaining} ref={ref}>
        <ListSubheader {...labelProps} id={labelId}>
          {label}
        </ListSubheader>
        {children}
      </MenuItemGroup>
    );
  }
);
