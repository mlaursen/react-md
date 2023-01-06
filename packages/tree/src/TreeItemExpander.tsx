import { IconRotator, useIcon } from "@react-md/icon";
import { cnb } from "cnbuilder";
import type { MouseEventHandler, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";
import { useTreeContext } from "./TreeProvider";

/**
 * @internal
 * @remarks \@since 6.0.0 Updated to use the latest API
 */
export interface TreeItemExpanderProps {
  /** @defaultValue `false` */
  left?: boolean;
  itemId: string;
  addon: ReactNode;
  disabled: boolean;
  expanded: boolean;
  isLeafNode: boolean;
  className?: string;
}

/**
 * @internal
 * @remarks \@since 6.0.0 Updated to support the new `expansionMode` behavior.
 */
export function TreeItemExpander(
  props: TreeItemExpanderProps
): ReactElement | null {
  const {
    itemId,
    left = false,
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

  const icon = useIcon("dropdown", expanderIcon);
  if (isLeafNode || expanderLeft !== left) {
    if (isValidElement<{ className?: string }>(addon)) {
      return cloneElement(addon, { className });
    }

    return <>{addon}</>;
  }

  const isCloneable = isValidElement(icon);
  let clickProps: { onClick: MouseEventHandler<Element> } | undefined;
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
