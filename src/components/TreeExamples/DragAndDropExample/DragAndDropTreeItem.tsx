import type { TreeItemRendererProps } from "@react-md/core";
import {
  Tooltip,
  TreeItem,
  useResizeObserver,
  useTooltip,
} from "@react-md/core";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import FolderOpenIcon from "@react-md/material-icons/FolderOpenIcon";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useState } from "react";

import type { Folder } from "src/constants/folders";

import styles from "./DragAndDropTreeItem.module.scss";
import { useFolderDnd } from "./useFolderDnd";

export function DragAndDropTreeItem(
  props: TreeItemRendererProps<Folder>
): ReactElement {
  const { item, ...remaining } = props;
  const { itemId, name } = item;
  const { drag, drop, droppable, isDisabled, isDragging, expanded } =
    useFolderDnd({
      ...item,
      childItems: props.childItems,
    });

  const [tooltipDisabled, setTooltipDisabled] = useState(true);
  const { elementProps, tooltipProps } = useTooltip({
    disabled: tooltipDisabled || isDisabled || isDragging,
    position: "right",
    spacing: "0.5rem",
  });
  const targetRef = useResizeObserver({
    disableHeight: true,
    onUpdate(entry) {
      const { target, borderBoxSize } = entry;
      if (borderBoxSize.length !== 1) {
        return;
      }

      setTooltipDisabled(
        target.scrollWidth <= Math.ceil(borderBoxSize[0].inlineSize)
      );
    },
  });

  return (
    <>
      <TreeItem
        {...remaining}
        {...elementProps}
        itemId={itemId}
        contentRef={(instance) => {
          drag(instance);
          drop(instance);
        }}
        disabled={isDisabled || isDragging}
        disabledOpacity
        contentClassName={cnb(droppable && styles.droppable)}
        leftAddon={expanded ? <FolderOpenIcon /> : <FolderIcon />}
        textProps={{
          ref: targetRef,
        }}
      >
        {name}
      </TreeItem>
      <Tooltip {...tooltipProps}>{name}</Tooltip>
    </>
  );
}
