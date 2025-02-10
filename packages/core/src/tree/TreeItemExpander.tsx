"use client";

import { cnb } from "cnbuilder";
import {
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
} from "react";

import { IconRotator } from "../icon/IconRotator.js";
import { getIcon } from "../icon/config.js";
import { useTreeContext } from "./TreeProvider.js";

/**
 * @internal
 * @since 6.0.0 Updated to use the latest API
 */
export interface TreeItemExpanderProps {
  /** @defaultValue `false` */
  isLeft?: boolean;
  itemId: string;
  addon: ReactNode;
  disabled: boolean;
  expanded: boolean;
  isLeafNode: boolean;
  className?: string;
}

/**
 * **Client Component**
 *
 * @internal
 * @since 6.0.0 Updated to support the new `expansionMode` behavior.
 */
export function TreeItemExpander(props: TreeItemExpanderProps): ReactElement {
  const {
    itemId,
    isLeft = false,
    addon,
    expanded,
    disabled,
    isLeafNode,
    className,
  } = props;
  const {
    expanderIcon,
    expanderLeft,
    expansionMode,
    disableTransition,
    toggleTreeItemExpansion,
  } = useTreeContext();

  const icon = getIcon("dropdown", expanderIcon);
  if (isLeafNode || expanderLeft !== isLeft) {
    if (isValidElement<{ className?: string }>(addon)) {
      return cloneElement(addon, { className });
    }

    return <>{addon}</>;
  }

  const isCloneable = isValidElement(icon);
  let clickProps: { onClick: MouseEventHandler } | undefined;
  if (expansionMode === "manual" && !disabled) {
    clickProps = {
      onClick(event) {
        // do not select the tree item if the icon is clicked
        event.stopPropagation();
        event.preventDefault();

        toggleTreeItemExpansion(itemId);
      },
    };
  }

  return (
    <>
      <IconRotator
        className={cnb(!addon && className)}
        {...(!isCloneable ? clickProps : undefined)}
        rotated={expanded}
        forceIconWrap={!isCloneable}
        disableTransition={disableTransition}
      >
        {clickProps && isCloneable ? cloneElement(icon, clickProps) : icon}
      </IconRotator>
      {addon}
    </>
  );
}
