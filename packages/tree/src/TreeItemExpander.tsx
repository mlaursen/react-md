import { IconRotator, useIcon } from "@react-md/icon";
import { cnb } from "cnbuilder";
import type { MouseEventHandler, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";
import { useTreeContext } from "./TreeProvider";
import type { TreeItemNode } from "./types";

export interface TreeItemExpanderProps {
  left?: boolean;
  item: TreeItemNode;
  addon: ReactNode;
  disabled: boolean;
  expanded: boolean;
  isLeafNode: boolean;
  className?: string;
}

export function TreeItemExpander(
  props: TreeItemExpanderProps
): ReactElement | null {
  const {
    item,
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
    onItemExpansion,
    disableTransition,
  } = useTreeContext();

  const icon = useIcon("expander", expanderIcon);
  const { itemId } = item;
  if (isLeafNode || expanderLeft !== left) {
    if (isValidElement(addon)) {
      return cloneElement(addon, { className });
    }

    return <>{addon}</>;
  }

  const isCloneable = isValidElement(icon);
  let clickProps: { onClick: MouseEventHandler<Element> } | undefined;
  if (expansionMode === "manual" && !disabled) {
    clickProps = {
      onClick(event) {
        event.preventDefault();
        onItemExpansion(itemId, !expanded);
      },
    };
  }

  return (
    <>
      <IconRotator
        className={cnb(!addon && className)}
        {...(isCloneable ? clickProps : undefined)}
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
